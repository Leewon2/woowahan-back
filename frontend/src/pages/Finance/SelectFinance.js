import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProductType } from "redux/Finance";
import './SelectFinance.css';

const SelectFinance = () => {
  const [finance, setFinance] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleCheckboxChange = (selectedFinance) => {
    dispatch(setProductType(selectedFinance));
    setFinance(selectedFinance);
  };

  const handleCardClick = (selectedFinance) => {
    dispatch(setProductType(selectedFinance));
    setFinance(selectedFinance);
  };
  const handleSelectProduct = () => {
    if (finance == ''){
      setValidationMessage('상품을 선택해 주세요.');
      return;
    }
    nav("/makeFinance");
  };

  return (
    <div className='select-container'>
      <p>금융 상품 생성</p>
      <div className="card" onClick={() => handleCardClick("DEPOSIT")}>
        <label className="card-label">
          예금
        </label>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={finance === "DEPOSIT"}
          onChange={() => handleCheckboxChange("DEPOSIT")}
        />
      </div>

      <div className="card" onClick={() => handleCardClick("SAVINGS")}>
        <label className="card-label">
          적금
        </label>
        <input
          type="checkbox"
          checked={finance === "SAVINGS"}
          onChange={() => handleCheckboxChange("SAVINGS")}
        />
      </div>
      <div className="card" onClick={() => handleCardClick("LOAN")}>
        <label className="card-label">
          대출
        </label>
        <input
          type="checkbox"
          checked={finance === "LOAN"}
          onChange={() => handleCheckboxChange("LOAN")}
        />
      </div>
      <div className="validation-message">{validationMessage}</div>
      <div className="select-button-container">
          <button className="select-button" onClick={handleSelectProduct}>
            계속
          </button>
        <div className="background-box"></div>
      </div>
    </div>
  );
};

export default SelectFinance;
