import { matchCurrency } from '../matchCurrency';

describe('matchCurrency', () => {
  describe('The coin’s name (e.g. Bitcoin) starts with the search term', () => {
    it('should return true if the coin`s name starts with foo', () => {
      expect(
        matchCurrency({ id: '', name: 'Foobar', symbol: '' }, { query: 'foo' })
      ).toBe(true);
    });

    it('should return false if the coin`s name end with foo', () => {
      expect(
        matchCurrency({ id: '', name: 'Barfoo', symbol: '' }, { query: 'foo' })
      ).toBe(false);
    });

    it('should return true if the coin`s name starts with Ethereum', () => {
      ['Ethereum Classic', 'Ethereum'].forEach((name) => {
        expect(
          matchCurrency({ id: '', name, symbol: '' }, { query: 'Ethereum' })
        ).toBe(true);
      });
    });
  });

  describe('The coin’s name contains a partial match with a ‘ ’ (space) prefixed to the search term', () => {
    it('should return true if the coin’s name contains Classic with a space prefixed', () => {
      expect(
        matchCurrency(
          { id: '', name: 'Ethereum Classic', symbol: '' },
          { query: 'Classic' }
        )
      ).toBe(true);
    });

    it('should return false if the coin’s name contains Classic without a space prefixed', () => {
      expect(
        matchCurrency(
          { id: '', name: 'Tronclassic', symbol: '' },
          { query: 'Classic' }
        )
      ).toBe(false);
    });
  });

  describe('The coin’s symbol starts with the search term', () => {
    it('should return true if the coin’s symbol starts with ET', () => {
      ['ETH', 'ETC', 'ETN'].forEach((symbol) => {
        expect(
          matchCurrency({ id: '', name: '', symbol }, { query: 'ET' })
        ).toBe(true);
      });
    });

    it('should return false if the coin’s symbol end with ET', () => {
      expect(
        matchCurrency({ id: '', name: '', symbol: 'BET' }, { query: 'ET' })
      ).toBe(false);
    });
  });
});
