/**
 * @jest-environment jsdom
 */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mountWithIntl } from '../../intl/helpers';
import BlockConfigMenu from '../../mobrender/components/block-config-menu';

describe('mobrender/components/block-config-menu', () => {
  const props = {
    block: { id: 1, hidden: false },
  };
  let menuConfig;
  beforeEach(() => {
    menuConfig = mountWithIntl(<BlockConfigMenu {...props} />);
  });

  it('should render dropdown menu with options to action', () => {
    expect(menuConfig.find('DropdownMenu').length).to.equal(1);
    expect(
      menuConfig.find('DropdownMenu').find('DropdownMenuItem').length
    ).to.equal(5);
  });

  it('should hide dropdown menu when display is false', () => {
    menuConfig.setProps({ display: false });
    expect(
      menuConfig.find('DropdownMenu').props().wrapperClassName
    ).to.contains('display-none');
  });

  it('should show dropdown menu when display is true', () => {
    menuConfig.setProps({ display: true });
    expect(
      menuConfig.find('DropdownMenu').props().wrapperClassName
    ).to.not.contains('display-none');
  });

  describe('should make menu item', () => {
    const menu = (index) => menuConfig.find('DropdownMenuItem').at(index);

    describe('1: change background', () => {
      const menuIndex = 0;

      it('should call onEdit("background-{block_id}") when clicked', () => {
        let result;
        menuConfig.setProps({
          onEdit: (turn) => {
            result = turn;
          },
        });
        menu(menuIndex).simulate('click');
        expect(result).to.equal(`background-${props.block.id}`);
      });

      it('should custom style to item', () => {
        const text = 'Alterar fundo';
        expect(menu(menuIndex).props().className).to.equal('btn');
        expect(menu(menuIndex).find('i').props().className).to.equal(
          'fa fa-picture-o'
        );
        expect(
          menu(menuIndex).find('span FormattedMessage').props().defaultMessage
        ).to.equal(text);
      });
    });

    describe('2: show/hide block', () => {
      const menuIndex = 1;

      it('should call update with block.hidden updated', () => {
        let result;
        menuConfig.setProps({
          update: (block) => {
            result = block;
          },
        });
        menu(menuIndex).simulate('click');
        expect(result).to.deep.equal({
          ...props.block,
          hidden: !props.block.hidden,
        });
      });

      it('should custom style to item', () => {
        expect(menu(menuIndex).props().className).to.equal('btn');
      });

      it('should custom style to item when block is hidden', () => {
        menuConfig.setProps({ block: { ...props.block, hidden: true } });
        expect(
          menu(menuIndex).find('span FormattedMessage').props().defaultMessage
        ).to.equal('Mostrar');
        expect(menu(menuIndex).find('i').props().className).to.equal(
          'fa fa-eye'
        );
      });

      it('should custom style to item when block isnt hidden', () => {
        expect(
          menu(menuIndex).find('span FormattedMessage').props().defaultMessage
        ).to.equal('Esconder');
        expect(menu(menuIndex).find('i').props().className).to.equal(
          'fa fa-eye-slash'
        );
      });
    });

    describe('3: remove block', () => {
      let confirmStub;
      const menuIndex = 2;

      beforeEach(() => {
        confirmStub = sinon.stub(window, 'confirm');
      });

      afterEach(() => {
        confirmStub.restore();
      });

      it('should call window.confirm when click', () => {
        menu(menuIndex).simulate('click');
        expect(confirmStub.called).to.equal(true);
      });

      it('should call destroy(block) when window.confirm is true', () => {
        let result;
        menuConfig.setProps({
          destroy: (block) => {
            result = block;
          },
        });
        confirmStub.returns(true);
        menu(menuIndex).simulate('click');
        expect(result).to.deep.equal(props.block);
      });

      it('should custom style item', () => {
        expect(menu(menuIndex).props().className).to.equal('btn');
        expect(
          menu(menuIndex).find('span FormattedMessage').props().defaultMessage
        ).to.equal('Remover');
        expect(menu(menuIndex).find('i').props().className).to.equal(
          'fa fa-trash'
        );
      });
    });

    describe('4: move up', () => {
      const menuIndex = 3;

      it('should call moveUp(block) when click and canMoveUp', () => {
        let result;
        menuConfig.setProps({
          moveUp: (block) => {
            result = block;
          },
          canMoveUp: true,
        });
        menu(menuIndex).simulate('click');
        expect(menu(menuIndex).props().disabled).to.equal(false);
        expect(result).to.deep.equal(props.block);
      });

      it('should disable button when !canMoveUp', () => {
        menuConfig.setProps({ canMoveUp: false });
        expect(menu(menuIndex).props().disabled).to.equal(true);
      });

      it('should custom style to item', () => {
        const text = 'Mover para cima';
        expect(menu(menuIndex).props().className).to.equal('btn');
        expect(
          menu(menuIndex).find('span FormattedMessage').props().defaultMessage
        ).to.equal(text);
        expect(menu(menuIndex).find('i').props().className).to.equal(
          'fa fa-chevron-up'
        );
      });
    });

    describe('5: move down', () => {
      const menuIndex = 4;

      it('should call moveDown(block) when click and canMoveDown', () => {
        let result;
        menuConfig.setProps({
          moveDown: (block) => {
            result = block;
          },
          canMoveDown: true,
        });
        menu(menuIndex).simulate('click');
        expect(result).to.deep.equal(props.block);
      });

      it('should disable button when !canMoveDown', () => {
        menuConfig.setProps({ canMoveDown: false });
        expect(menu(menuIndex).props().disabled).to.equal(true);
      });

      it('should custom style to item', () => {
        const text = 'Mover para baixo';
        expect(menu(menuIndex).props().className).to.equal('btn');
        expect(
          menu(menuIndex).find('span FormattedMessage').props().defaultMessage
        ).to.equal(text);
        expect(menu(menuIndex).find('i').props().className).to.equal(
          'fa fa-chevron-down'
        );
      });
    });
  });
});
