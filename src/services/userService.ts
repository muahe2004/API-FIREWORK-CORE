import { injectable } from "tsyringe";
import { UserRepository } from "../repositories/userRepository";
import { User } from "../models/user";
import { Action } from "../models/action";
import { Tree } from "../ultilities/tree";
import { verifyToken } from "../config/jwt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { system_email } from "../config/system_email";
var md5 = require("md5");

@injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private treeUltility: Tree
  ) {}

  async authenticate(username: string, password: string): Promise<any> {
    let md5_pass = md5(password);
    let user = await this.userRepository.authenticate(username, md5_pass);
    if (user) {
      let functions = await this.userRepository.getFunctionByUserId(
        user.user_id
      );
      let functionTree = this.treeUltility.getFunctionTree(functions, 1, "0");
      let actions = await this.userRepository.getActionByUserId(user.user_id);
      return {
        user_id: user.user_id,
        role_group: user.role_group,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        full_name: user.full_name,
        avatar: user.avatar,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
        email: user.email,
        phone_number: user.phone_number,
        user_name: user.user_name,
        online_flag: user.online_flag,
        is_guest: user.is_guest,
        functions: functionTree,
        actions: actions, 
        employees: user.employees,
      };
    }
    return null;
  }

  async getFunctionsByUser(user_id: string) {
    let functions = await this.userRepository.getFunctionByUserId(user_id);
    let functionTree = this.treeUltility.getFunctionTree(functions, 1, "0");

    return functionTree;
  }

  async creatUser(user: User): Promise<any> {
    user.user_id = uuidv4();
    user.password = md5(user.password);
    user.employee_id = user.user_id;
    let arrNames: string[] = user.full_name.split(" ");
    switch (arrNames.length) {
      case 1: {
        user.last_name = arrNames[0];
        break;
      }
      case 2: {
        user.first_name = arrNames[0];
        user.last_name = arrNames[1];
        break;
      }
      default: {
        user.first_name = arrNames[0];
        user.middle_name = arrNames.slice(1, arrNames.length - 1).join(" ");
        user.last_name = arrNames[arrNames.length - 1];
        break;
      }
    }
    return this.userRepository.creatUser(user);
  }

  async lockUser(user: User): Promise<any> {
    return this.userRepository.lockUser(user);
  }

  async updateUser(user: User): Promise<any> {
    user.employee_id = user.user_id;
    let arrNames: string[] = user.full_name.split(" ");
    switch (arrNames.length) {
      case 1: {
        user.last_name = arrNames[0];
        break;
      }
      case 2: {
        user.first_name = arrNames[0];
        user.last_name = arrNames[1];
        break;
      }
      default: {
        user.first_name = arrNames[0];
        user.middle_name = arrNames.slice(1, arrNames.length - 1).join(" ");
        user.last_name = arrNames[arrNames.length - 1];
        break;
      }
    }
    return this.userRepository.updateUser(user);
  }

  async getUserById(id: string): Promise<any> {
    return this.userRepository.getUserById(id);
  }

  async searchUser(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    branch_id: string,
    department_id: string,
    customer_id: string,
    user_id: string
  ): Promise<any> {
    return this.userRepository.searchUser(
      pageIndex,
      pageSize,
      search_content,
      branch_id,
      department_id,
      customer_id,
      user_id
    );
  }

  async deleteUser(list_json: any, updated_by_id: string): Promise<any> {
    return this.userRepository.deleteUser(list_json, updated_by_id);
  }

  async authorize(token: string) {
    let user_data = verifyToken(token);
    if (user_data == null) throw new Error("Phiên đăng nhập hết hạn");
    let functions = await this.userRepository.getFunctionByUserId(
      user_data.user_id
    );
    let functionTree = this.treeUltility.getFunctionTree(functions, 1, "0");
    let actions = await this.userRepository.getActionByUserId(
      user_data.user_id
    );
    let action_results = [];
    for (let row of actions) {
      let row_data = row as Action;
      action_results.push(row_data.action_code);
    }
    let data = {
      user_id: user_data.user_id,
      first_name: user_data.first_name,
      middle_name: user_data.middle_name,
      last_name: user_data.last_name,
      full_name: user_data.full_name,
      avatar: user_data.avatar,
      gender: user_data.gender,
      date_of_birth: user_data.date_of_birth,
      email: user_data.email,
      phone_number: user_data.phone_number,
      user_name: user_data.user_name,
      online_flag: user_data.online_flag,
      is_guest: user_data.is_guest,
      functions: functionTree,
      actions: action_results,
    };
    return data;
  }

  async changePassword(
    user_id: string,
    old_password: string,
    new_password: string,
    lu_user_id: string
  ) {
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (old_password == null) throw new Error("Mật khẩu hiện tại không thể để trống");
    // if (new_password == null) throw new Error("Mật khẩu mới không thể để trống");
    // if (lu_user_id == null) throw new Error("lu_user_id không thể để trống");
    // const isValidPassword = passwordRegex.test(new_password);
    // if (!isValidPassword) throw Error("Mật khẩu phải có ít nhất 8 kí tự bao gồm chữ hoa, chữ thường, và ít nhất một kí tự đặc biệt và số");
    old_password = md5(old_password);
    new_password = md5(new_password);
    return this.userRepository.changePassword(
      user_id,
      old_password,
      new_password,
      lu_user_id
    );
  }

  async resetPassword(user_name: string, email: string) {
    const generateRandomString = (length: number) => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };
    var new_password = generateRandomString(8);
    var hashed_password = md5(new_password);
    let result = await this.userRepository.resetPassword(
      user_name,
      email,
      hashed_password
    );
    if (result) {
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: system_email.email,
          pass: system_email.password,
        },
      });

      const emailBody = `
                      <p>Xin chào,</p>
                      <p>Hệ thống đã nhận được yêu cầu đổi mật từ bạn.</p>
                      <p>Mật khẩu mới của bạn là: <b> ${new_password}</b></p>
                      <p>Trân trọng.
                      `;

      var mailOptions = {
        from: system_email.email,
        to: email,
        subject: "Đổi mật khẩu",
        html: emailBody,
      };

      mailTransporter.sendMail(mailOptions, function (err, data) {
        if (err) console.log(err);
      });
    }
  }

  async resetPasswordByAdmin(user_id: string, lu_user_id: string) {
    const generateRandomString = (length: number) => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };
    var new_password = generateRandomString(8);
    var hashed_password = md5(new_password);
    let email = await this.userRepository.resetPasswordByAdmin(
      user_id,
      hashed_password,
      lu_user_id
    );
    if (email) {
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: system_email.email,
          pass: system_email.password,
        },
      });

      const emailBody = `
                      <p>Xin chào,</p>
                      <p>Hệ thống đã nhận được yêu cầu đổi mật từ bạn.</p>
                      <p>Mật khẩu mới của bạn là: <b> ${new_password}</b></p>
                      <p>Trân trọng.
                    `;

      var mailOptions = {
        from: system_email.email,
        to: email,
        subject: "Đổi mật khẩu",
        html: emailBody,
      };

      mailTransporter.sendMail(mailOptions, function (err, data) {
        if (err) console.log(err);
      });
    }
    return new_password;
  }
}
