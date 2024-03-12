'use strict';

const { now } = require('sequelize/types/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('People', [{
      title:"How to type",
      content: "just click your keyboard",
      startdate: now(),
      enddate: now(),
      reactjs: "",
      nodejs: "",
      github: "",
      Python: "",
      image: "",
      createdAt: new Date(),
      updatedAt: new Date()

     }], {});
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('People', null, {});
     
  }
};
