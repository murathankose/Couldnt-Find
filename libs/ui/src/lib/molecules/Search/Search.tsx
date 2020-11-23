import React, { useState } from 'react';
import { Button } from '../../atoms/Button';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { Input } from '../../atoms/Input';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { api } from '@internship/shared/api';
import { Dropdown } from 'react-bootstrap';

const StyledRow = styled.div`
  display: inline-flex;
`;
const StyledInput = styled(Input)`
  margin-right: 1rem;
`;
const StyledLink = styled(Link)`
  color: blueviolet;
`;
const StyledDropdown = styled(Dropdown)`
  margin-right: 1rem;
`;
let dropDownLinkStyle = {
  backgroundColor: 'blueviolet',
  borderColor: 'blueviolet'
};
export const Search = () => {
  const { handleSubmit, register, errors } = useForm();
  const [isUsername, setIsUsername] = useState(false);
  const [isTopicName, setIsTopicName] = useState(false);
  const [value, setValue] = useState('');

  const setSearch = () => {
    setIsTopicName(false);
    setIsUsername(false);
  };
  const onSubmit = (values) => {
    if (values.search !== '') {
      api.auth
        .getSearchUsername(values.search)
        .then((r) => {
          setIsUsername(true), setValue(values.search);
        })
        .catch((e) => console.error(e));
      api.auth
        .getSearchTopicName(values.search)
        .then((r) => {
          setIsTopicName(true), setValue(values.search);
        })
        .catch((e) => console.error(e));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledRow>
        {!isUsername && !isTopicName ? (
          <>
            <StyledInput placeholder="Search" name="search" ref={register({ required: false })} errors={errors} />
            <Button type="submit" variant="light">
              <FontAwesomeIcon icon={faSearchengin} />
            </Button>
          </>
        ) : (
          <StyledDropdown>
            <Dropdown.Toggle style={dropDownLinkStyle} id="dropdown-basic">
              Arama Sonuçları
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {isUsername ? (
                <Dropdown.Item>
                  <StyledLink onClick={setSearch} to={'/user/' + value}>
                    {value}: Kullanıcı
                  </StyledLink>
                </Dropdown.Item>
              ) : null}
              {isTopicName ? (
                <Dropdown.Item>
                  <StyledLink onClick={setSearch} to={'/contents/' + value}>
                    {value}: Konu
                  </StyledLink>
                </Dropdown.Item>
              ) : null}
              <Dropdown.Item onClick={setSearch}>
                <FontAwesomeIcon icon={faTimes} />
              </Dropdown.Item>
            </Dropdown.Menu>
          </StyledDropdown>
        )}
      </StyledRow>
    </form>
  );
};
