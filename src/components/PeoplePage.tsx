import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loaderPeople, setLoaderPeople] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const [sex, setSex] = useState();
  // const [query, setQuery] = useState();
  // const [centuries, setCenturies] = useState([]);

  useEffect(() => {
    setLoaderPeople(true);
    setErrorMessage('');

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoaderPeople(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loaderPeople && <Loader />}

              {!loaderPeople && errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!loaderPeople && !errorMessage && people && (
                <PeopleTable people={people} />
              )}

              {!loaderPeople && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
