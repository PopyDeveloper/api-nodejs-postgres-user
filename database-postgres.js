import { randomUUID } from "crypto";
import { sql } from "./db.js";

export class DataBasePostgres {
  async list() {
    const users = await sql`select * from "user"`;

    return users;
  }

  async getUserById(id) {
    const user = id
      ? await sql`select * from "user" where id ilike "${id}"`
      : null;

    return user;
  }

  async addUser(user) {
    const id = randomUUID();
    const { name, age } = user;

    await sql`insert into "user" (id, name, age) VALUES (${id}, ${name}, ${age})`;
  }

  async updateUser(id, user) {
    const { name, age } = user;
    const userUpdate = await sql`UPDATE "user"
    SET name = ${name},
        age = ${age}
    WHERE id = ${id}
    `;

    return userUpdate;
  }

  async deleteUser(id) {
    await sql`delete from "user" where id=${id}`;
  }
}
