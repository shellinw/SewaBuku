"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const dataBuku = require("../daftar_buku.json");
        dataBuku.map((el) => {
            delete el.id;
            el.createdAt = el.updatedAt = new Date();
            return el;
        });
        await queryInterface.bulkInsert("Bukus", dataBuku, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Bukus", null, {});
    },
};
