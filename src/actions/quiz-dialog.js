const extractAnswer = (pageNum, quiz) => {
    // each quiz contains
    //  titleText: String
    //  questions: []

    // each question in multiple-choices questions contains
    //  headerText: String
    //  choices: []
    //  hintText: String

    // each choice in choices contains
    //  check: bool  /* whether this is true or false as the correct answers
    //  labelText: String of choice label


    let answers = {}
    let questions = quiz.questions
    let questionNum = 1
    let answer = questions.reduce((answers, question, index) => {
        // console.log("index", index, "questionNum", questionNum)

        let choiceNum = 1
        question.choices.reduce((answer, choice, choiceIndex) => {
            // console.log("choiceIndex", choiceIndex, "choiceNum", choiceNum)
            answers[`${pageNum},${questionNum},${choiceNum}`] = choice.check
            choiceNum = choiceNum + 1
        }, answers)

        questionNum = questionNum + 1
        return answers
    }, {})

    return answer
}

const validateAnswer = (target, source, quiz, lang) => {
  let hintMessages

  let failures = []
  Object.keys(target).forEach((key) => {
     if (target[key] !== source[key])
        failures.push(key)
  })
  if (failures.length) {
      let questionKeys = failures.reduce((keyRepo, key)=> {
        // drop the choice Id from the `p,q,c` key pattern
        let questionId = key.split(',').splice(0,2).join(',')
        // save it in the keyRepo for hintMessage extraction later
        let newKeyRepo =  {...keyRepo}
        newKeyRepo[`${questionId}`] = false
        return newKeyRepo
      }, {})

      // hintMessage Extraction
      let hintMessageIndices = Object.keys(questionKeys).map((qKey) => {
          // converts failed `page,question` into `question`
          let hintMessageIdx = parseInt(qKey.split(',').splice(1,1)[0], 10) - 1
          return hintMessageIdx
      })
      hintMessages = hintMessageIndices.map((idx) => {
          return quiz.questions[idx].hintText[lang]
      })
  } else {
    hintMessages = []
  }
  return {
      passed: failures.length ? false : true,
      hintMessages,
  }
}

const submitQuiz = (page, quizState, views, lang) => {

    let answer = extractAnswer(page, views[page].quiz);
    let submit_template = Object.keys(answer).reduce((template, key) => {
      let r = {...template}
      r[`${key}`] = false
      return r
    }, {})

    let submitted = {...submit_template, ...quizState}
    const {passed, hintMessages} = validateAnswer(answer, submitted, views[page].quiz, lang)
    return {passed, hintMessages}
    //return (check) ? showCompletionOfPage() : showHintOfPage(hintMessages)
}

module.exports = {
    submitQuiz,
}
