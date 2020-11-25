import React, { useState } from 'react';
import styled from 'styled-components';
import { api } from '@internship/shared/api';
import AsyncSelect from 'react-select/async';
import { useHistory } from 'react-router-dom';

const StyledRow = styled.div`
  width: 20%;
  margin-right: 1.5rem;
`;

export const Search = () => {
  const [optionsAll, setOptionsAll] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const options = [];
  const history = useHistory();

  const filter = (inputValue: string) => {
    return optionsAll.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const loadOptions = (inputValue, callback) => {
    setSelectedValue(inputValue);
    setTimeout(() => {
      callback(filter(inputValue));
    }, 1000);
  };

  const onChange = (e) => {
    if (e !== '') {
      api.auth
        .getSearchUsername(e)
        .then((r) => {
          {
            r?.map((item, key) => options.push({ value: key, label: item + ' :Kullanıcı', key: item }));
          }
        })
        .catch((e) => console.error(e));
      api.auth
        .getSearchTopicName(e)
        .then((r) => {
          {
            r?.map((item, key) => options.push({ value: key, label: item + ' :Konu', key: item }));
          }
        })
        .catch((e) => console.error(e));
      setOptionsAll(options);
    }
  };

  const onChangeGo = (e) => {
    setSelectedValue('');
    setOptionsAll([]);
    if (e.label.length - e.label.lastIndexOf(':Konu') == 5) history.push('/contents/' + e.key);
    else if (e.label.length - e.label.lastIndexOf(':Kullanıcı') == 10) history.push('/user/' + e.key);
  };

  return (
    <>
      <StyledRow>
        <AsyncSelect
          value={selectedValue}
          cacheOptions
          loadOptions={loadOptions}
          onChange={(e) => onChangeGo(e)}
          onInputChange={(e) => onChange(e)}
        />
      </StyledRow>
    </>
  );
};
