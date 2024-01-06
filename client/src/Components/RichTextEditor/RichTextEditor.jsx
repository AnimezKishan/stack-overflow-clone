import React, { useState } from 'react';
import './RichTextEditor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignCenter,
  faAlignLeft,
  faBold,
  faItalic,
  faTextSlash,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons';

const RichTextEditor = ({ setQuestionBody, setcssStyle }) => {
  const [styles, setStyles] = useState({
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'left',
    textTransform: 'none',
    fontColor: '#000000',
    highlightColor: '#ffffff',
  });
  
  const [inputValue, setInputValue] = useState('');

  const handleFontSizeChange = (e) => {
    setStyles({ ...styles, fontSize: e.target.value });
    setcssStyle({
      fontSize: styles.fontSize, 
      color: `${styles.fontColor}`, 
      fontStyle: `${styles.fontStyle}`,
      fontWeight: `${styles.fontWeight}`,
      textAlign: `${styles.textAlign}`,
      textDecoration: `${styles.textDecoration}`, 
      textTransform: `${styles.textTransform}`}
    );
  };

  const handleButtonClick = (style, value) => {
    switch (style) {
      case 'fontWeight':
        setStyles({ ...styles, fontWeight: styles.fontWeight === 'bold' ? 'normal' : 'bold' });
        break;
      case 'fontStyle':
        setStyles({ ...styles, fontStyle: styles.fontStyle === 'italic' ? 'normal' : 'italic' });
        break;
      case 'textDecoration':
        setStyles({
          ...styles,
          textDecoration: styles.textDecoration === 'underline' ? 'none' : 'underline',
        });
        break;
      case 'textAlign':
        setStyles({ ...styles, textAlign: value });
        break;
      case 'textTransform':
        setStyles({ ...styles, textTransform: styles.textTransform === 'uppercase' ? 'none' : 'uppercase' });
        break;
      case 'clearStyles':
        setStyles({
          fontSize: 18,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          textTransform: 'none',
          fontColor: '#000000',
          highlightColor: '#ffffff',
        });
        setInputValue('');
        break;
      default:
        break;
    }
    setcssStyle({
      fontSize: styles.fontSize, 
      color: `${styles.fontColor}`, 
      fontStyle: `${styles.fontStyle}`,
      fontWeight: `${styles.fontWeight}`,
      textAlign: `${styles.textAlign}`,
      textDecoration: `${styles.textDecoration}`, 
      textTransform: `${styles.textTransform}`}
    );
  };

  const handleFontColorChange = (e) => {
    setStyles({ ...styles, fontColor: e.target.value });
    setcssStyle({
      fontSize: Number(styles.fontSize), 
      color: `${styles.fontColor}`, 
      fontStyle: `${styles.fontStyle}`,
      fontWeight: `${styles.fontWeight}`,
      textAlign: `${styles.textAlign}`,
      textDecoration: `${styles.textDecoration}`, 
      textTransform: `${styles.textTransform}`}
    );
  };

  return (
    <div className="section">
      <div className="row">
        <div className="col col-buttons">
          <div className="first box">
            <input
              id="font-size"
              type="number"
              value={styles.fontSize}
              min="1"
              max="100"
              onChange={handleFontSizeChange}
            />
          </div>
          <div className="second box">
            <button
              type="button"
              className={styles.fontWeight === 'bold' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('fontWeight')}
            >
              <FontAwesomeIcon icon={faBold} />
            </button>
            <button
              type="button"
              className={styles.fontStyle === 'italic' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('fontStyle')}
            >
              <FontAwesomeIcon icon={faItalic}/>
            </button>
            <button
              type="button"
              className={styles.textDecoration === 'underline' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('textDecoration')}
            >
              <FontAwesomeIcon icon={faUnderline}/>
            </button>
          </div>
          <div className="third box">
            <button
              type="button"
              className={styles.textAlign === 'left' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('textAlign', 'left')}
            >
              <FontAwesomeIcon icon={faAlignLeft}/>
            </button>
            <button
              type="button"
              className={styles.textAlign === 'center' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('textAlign', 'center')}
            >
              <FontAwesomeIcon icon={faAlignCenter}/>
            </button>
            <button
              type="button"
              className={styles.textAlign === 'right' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('textAlign', 'right')}
            >
              <FontAwesomeIcon icon={faAlignCenter}/>
            </button>
          </div>
          <div className="fourth box">
            <button
              type="button"
              className={styles.textTransform === 'uppercase' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('textTransform')}
            >
              aA
            </button>
            <button
              type="button"
              className='button'
              onClick={() => handleButtonClick('clearStyles')}
            >
              <FontAwesomeIcon icon={faTextSlash}/>
            </button>
            <input
              type="color"
              className='color'
              style={{width: "50px", height: "45px", outline: "none", border: "none", background: "none"}}
              onChange={handleFontColorChange}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col textarea-wrapper">
          <textarea
            id="textarea1"
            className="textarea"
            placeholder="Your text here "
            style={{
              fontSize: `${styles.fontSize}px`,
              fontWeight: styles.fontWeight,
              fontStyle: styles.fontStyle,
              textDecoration: styles.textDecoration,
              textAlign: styles.textAlign,
              textTransform: styles.textTransform,
              color: styles.fontColor,
              backgroundColor: styles.highlightColor,
            }}
            value={inputValue}
            onChange={(e) => {
              
              setInputValue(e.target.value);
              setQuestionBody(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
