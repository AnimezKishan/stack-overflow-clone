import React from 'react'
import moment from 'moment';
import {useTranslation} from 'react-i18next'

const LoginInfo = ({currentUser}) => {

  const info = currentUser?.result?.info;
  const {t} = useTranslation();

  return (
    <div className='loginInfo-main'>
      <div className="loginInfo-title">
        <h4>{t('logInf')}</h4>
      </div>
      <div className="loginInfo-table">
        <table>
          <thead>
            <tr>
              <th>{t('br')}</th>
              <th>{t('op')}</th>
              <th>{t('dvc')}</th>
              <th>{t('ip')}</th>
              <th>{t('ti')}</th>
            </tr>
          </thead>
          {
            info.map((inf) => (
                <tbody key={inf._id} className='info-data'>
                  <tr>
                    <td>{inf?.browser}</td>
                    <td>{inf?.os}</td>
                    <td>{inf?.device}</td>
                    <td>{inf?.ip}</td>
                    <td>{moment(inf?.loggedOn).fromNow()}</td>
                  </tr>
                </tbody>
            ))
          }
        </table>
      </div>
      <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
        <h4>{t('qq')}</h4>
        <p>{currentUser?.result?.questionQouta}</p>
      </div>
    </div>
  )
}

export default LoginInfo