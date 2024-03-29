import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import { MoreVerticalFilled } from '@fluentui/react-icons';
import { Action } from '@mono-catalog/types';
import { SyntheticEvent, useCallback } from 'react';

interface ProductMenuProps {
  className: string;
  actions: Action[];
  productId: string;
}

export function ProductMenu({
  className,
  actions,
  productId,
}: ProductMenuProps) {
  const onTriggerButtonClick = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button className={className} onClick={onTriggerButtonClick}>
          <MoreVerticalFilled />
        </Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {actions.map((action) => (
            <MenuItem
              key={action.label}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                action.onClick(productId);
              }}
            >
              {action.label}
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}

export default ProductMenu;
