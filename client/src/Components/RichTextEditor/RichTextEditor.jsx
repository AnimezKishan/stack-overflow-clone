import React, { useState } from 'react';
import './RichTextEditor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignCenter, faAlignLeft, faBold, faItalic, faTextSlash, faUnderline} from '@fortawesome/free-solid-svg-icons';

const RichTextEditor = ({setQuestionBody}) => {
  const [fontSize, setFontSize] = useState(18);
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontStyle, setFontStyle] = useState('normal');
  const [textDecoration, setTextDecoration] = useState('none');
  const [textAlign, setTextAlign] = useState('left');
  const [textTransform, setTextTransform] = useState('none');
  const [fontColor, setFontColor] = useState('#000000');
  const [highlightColor, setHighlightColor] = useState('#ffffff');
  const [inputValue, setInputValue] = useState('');

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleButtonClick = (style, value) => {
    switch (style) {
      case 'fontWeight':
        setFontWeight(fontWeight === 'bold' ? 'normal' : 'bold');
        break;
      case 'fontStyle':
        setFontStyle(fontStyle === 'italic' ? 'normal' : 'italic');
        break;
      case 'textDecoration':
        setTextDecoration(textDecoration === 'underline' ? 'none' : 'underline');
        break;
      case 'textAlign':
        setTextAlign(value);
        break;
      case 'textTransform':
        setTextTransform(textTransform === 'uppercase' ? 'none' : 'uppercase');
        break;
      case 'clearStyles':
        setFontWeight('normal');
        setFontStyle('normal');
        setTextDecoration('none');
        setTextAlign('left');
        setTextTransform('none');
        setInputValue('');
        break;
      default:
        break;
    }
  };

  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
  };

  const handleHighlightColorChange = (e) => {
    setHighlightColor(e.target.value);
  };

  return (
    <div className='section'>
      <div className="row">
        <div className="col col-buttons">
          <div className="first box">
            <input
              id="font-size"
              type="number"
              value={fontSize}
              min="1"
              max="100"
              onChange={handleFontSizeChange}
            />
          </div>
          <div className="second box">
            <button
              type="button"
              className={fontWeight === 'bold' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('fontWeight')}
            >
              <FontAwesomeIcon icon={faBold}/>
            </button>
            <button
              type="button"
              className={fontStyle === 'italic' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('fontStyle')}
            >
              <FontAwesomeIcon icon={faItalic}/>
            </button>
            <button
              type="button"
              className={textDecoration === 'underline' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('textDecoration')}
            >
              <FontAwesomeIcon icon={faUnderline}/>
            </button>
          </div>
          <div className="third box">
            <button
              type="button"
              className={textAlign === 'left' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('textAlign', 'left')}
            >
              <FontAwesomeIcon icon={faAlignLeft}/>
            </button>
            <button
              type="button"
              className={textAlign === 'center' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('textAlign', 'center')}
            >
              <FontAwesomeIcon icon={faAlignCenter}/>
            </button>
            <button
              type="button"
              className={textAlign === 'right' ? 'active button' : 'button'}
              onClick={() => handleButtonClick('textAlign', 'right')}
            >
              <FontAwesomeIcon icon={faAlignCenter}/>
            </button>
          </div>
          <div className="fourth box">
            <button
              type="button"
              className={textTransform === 'uppercase' ? 'active button' : 'button'}
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
            className='textarea'
            placeholder="Your text here "
            style={{
              fontSize: `${fontSize}px`,
              fontWeight,
              fontStyle,
              textDecoration,
              textAlign,
              textTransform,
              color: fontColor,
              backgroundColor: highlightColor,
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
