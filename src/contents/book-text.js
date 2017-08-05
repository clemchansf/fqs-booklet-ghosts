import React, { Component } from 'react'
import {pages} from './page-text.js'
import {quizess} from './quiz-text.js'

const views = pages.map((page, i) => {
  return {
     page,
     quiz: quizess[i]
  }
})
module.exports = {views};
