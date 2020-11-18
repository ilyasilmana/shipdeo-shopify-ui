import React from 'react';
import { ActionList, Popover } from '@shopify/polaris';

/**
 * @param {Object} props
 * @param {boolean} props.show
 * @param {(value) => void} props.onHide
 * @param {(value) => void} props.onSelect
 * @param {{label: string; value: string}[]} props.items
 * @param {'left' | 'center' | 'right'=} props.preferredAlignment
 * @param {'above' | 'below' | 'mostSpace'=} props.preferredPosition
 * @param {boolean=} props.fluidContent
 * @param {boolean=} props.fullWidth
 * @param {boolean=} props.fullHeight
 * @param {any} props.children
 */
const Dropdown = (props) => {
  return (
    <Popover
      active={props.show}
      activator={props.children}
      onClose={props.onHide}
      preferredAlignment={props.preferredAlignment || 'center'}
      preferredPosition={props.preferredPosition || 'below'}
      fluidContent={props.fluidContent}
      fullWidth={props.fullWidth}
      fullHeight={props.fullHeight}
    >
      <ActionList
        items={
          props.items.map((item) => ({
            content: item.label,
            onAction: () => props.onSelect(item.value)
          }))
        }
      />
    </Popover>
  )
}

export default Dropdown;
