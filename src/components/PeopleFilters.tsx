import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

enum Sex {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const { pathname } = useLocation();

  const sex = searchParams.get('sex') || Sex.All;
  const query = searchParams.get('query') || '';
  // const centuries = searchParams.getAll('centuries') || [];

  const handleSexChange = (s: Sex) => () => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', s);
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <span>{sex}</span>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.keys(Sex).map(x => (
          <Link
            className={classNames([
              {
                'is-active': x === searchParams.get('sex'),
              },
            ])}
            to={{ pathname: '/people', search: searchParams.toString() }}
            key={x}
            onClick={handleSexChange(x as Sex)}
          >
            {x}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
