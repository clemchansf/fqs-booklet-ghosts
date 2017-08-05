import React, {Component} from 'react'
import {
  project_group_label,
  project_manager_label,
  engineering_team_label,
  technical_member_label,
  graphic_designer_label,
  project_managers,
  engeering_team_members,
  graphic_designers,
  project_version_label,
  project_current_version,
} from '../contents/team-text.js'

export default class Team extends Component {
    render() {
      const props = this.props
      const context = props.teamContext
      const lang = context.state.lang
      return (
        <div>
          <div><h3>{project_group_label[lang]}</h3></div>
          <div>{project_version_label[lang]}</div>
          <ul><li>{project_current_version[lang]}</li></ul>
          <div>{project_manager_label[lang]}</div>
          <ul>
            {project_managers.map((manager,idx)=>{
              return <li key={idx}>{manager[lang]}</li>
            })}
          </ul>
          <div>{engineering_team_label[lang]}, {technical_member_label[lang]}</div>
          <ul>
            {engeering_team_members.map((dev,idx)=>{
              return <li key={idx}>{dev[lang]}</li>
            })}
          </ul>
          <div>{graphic_designer_label[lang]}</div>
          <ul>
            {graphic_designers.map((designer,idx)=>{
              return <li key={idx}>{designer[lang]}</li>
            })}
          </ul>
        </div>
      )

    }
}
