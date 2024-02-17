import { randomUUID } from "crypto";

export class DataBase {
  #users = new Map();

  list() {
    return Array.from(this.#users.entries()).map((arr) => {
      const id = arr[0];
      const data = arr[1];

      return {
        id,
        ...data,
      };
    });
  }

  addUser(user) {
    const userId = randomUUID();
    this.#users.set(userId, user);
  }

  updateUser(id, user) {
    this.#users.set(id, user);
  }

  deleteUser(id) {
    this.#users.delete(id);
  }
}
