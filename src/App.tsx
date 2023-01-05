import { Component } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort goods if needed
  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort(
      (firstGood, secondGood) => firstGood.localeCompare(secondGood),
    );
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort(
      (firstGood, secondGood) => firstGood.length - secondGood.length,
    );
  }

  // Reverse goods if needed
  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export class App extends Component<{}, State> {
  state: Readonly<State> = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  render() {
    const {
      isReversed,
      sortType,
    } = this.state;

    const isChangesMade = isReversed || sortType !== SortType.NONE;

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={
              classNames(
                'button is-info',
                { 'is-light': sortType !== SortType.ALPHABET },
              )
            }
            onClick={() => this.setState({
              sortType: SortType.ALPHABET,
            })}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={
              classNames(
                'button is-success',
                { 'is-light': sortType !== SortType.LENGTH },
              )
            }
            onClick={() => this.setState({
              sortType: SortType.LENGTH,
            })}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={
              classNames(
                'button is-warning',
                { 'is-light': !isReversed },
              )
            }
            onClick={() => this.setState(state => ({
              isReversed: !state.isReversed,
            }))}
          >
            Reverse
          </button>

          {
            isChangesMade && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => this.setState({
                  isReversed: false,
                  sortType: SortType.NONE,
                })}
              >
                Reset
              </button>
            )
          }
        </div>

        <ul>
          {
            getReorderedGoods(
              goodsFromServer, this.state,
            ).map(good => (<li key={good} data-cy="Good">{`${good}`}</li>))
          }
        </ul>
      </div>
    );
  }
}