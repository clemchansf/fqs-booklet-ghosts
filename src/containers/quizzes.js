import React, {Component} from 'react'
import Checkbox from 'material-ui/Checkbox';
import {toggleQuizCheckbox} from '../actions/quiz.js'
const styles = {
  checkBox: {
    marginTop: 12,
  },
};

export default class Quizzes extends Component {
  render() {
    const props = this.props;
    const {store } = props
    const views = props.data
    const state = props.state
    const pageNum = state.page
    const lang = state.lang

    const quiz = views[pageNum].quiz;
    const choices =  quiz.questions.map((question,index)=>{
          return (
              <div key={index}>
                <h2>{`${index+1} ${question.headerText[lang]}`}</h2>
                {question.choices.map((choice, id) => {
                    return (
                      <div key={id}>
                         <Checkbox
                             defaultChecked={false}
                             name={`p${pageNum},q${index},id${id}`}
                             label={choice.labelText[lang]}
                             labelPosition="right"
                             style={styles.checkBox}
                             onCheck={(e)=>{
                                //e.preventDefault()
                                e.stopPropagation()
                                store.dispatch(toggleQuizCheckbox(pageNum, index+1, id+1))
                             }}
                         />
                      </div>
                    )
                })}
              </div>
          )
        })
    const quizList = (
      <div key={pageNum}>
        <h2>
          {quiz ? quiz.titleText[lang] : "doesn't have title text"}
        </h2>
        <div>
         {choices}
        </div>
      </div>
    )
    return (
      <div>
      {quizList}
      </div>
    )
  }
}
