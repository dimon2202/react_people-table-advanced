import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();

  const findPersonSlug = (name: string | null) => {
    return people.find(p => p.name === name)?.slug || null;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames([
              {
                'has-background-warning': person.slug === slug,
              },
            ])}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={classNames([
                  {
                    'has-text-danger': person.sex === 'f',
                  },
                ])}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {findPersonSlug(person.motherName) ? (
                <Link
                  to={`/people/${findPersonSlug(person.motherName)}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                <div>{person.motherName ?? '-'}</div>
              )}
            </td>
            <td>
              {findPersonSlug(person.fatherName) ? (
                <Link to={`/people/${findPersonSlug(person.fatherName)}`}>
                  {person.fatherName}
                </Link>
              ) : (
                <div>{person.fatherName ?? '-'}</div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
