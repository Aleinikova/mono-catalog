import {
  Menu,
  MenuTrigger,
  Button,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';

import { MoreVerticalFilled } from '@fluentui/react-icons';
import { Action } from '@mono-catalog/types';

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
  return (
    <Menu>
      <MenuTrigger>
        <Button className={className}>
          <MoreVerticalFilled />
        </Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {actions.map((action) => (
            <MenuItem
              key={action.label}
              onClick={() => action.onClick(productId)}
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
