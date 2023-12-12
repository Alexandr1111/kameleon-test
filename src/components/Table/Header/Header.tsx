import React, {FC} from 'react';
import cl from "classnames";
import c from "./Header.module.scss";

type THeader = {
    onSort: (field: string) => void;
}

export const Header: FC<THeader> = (props) => {
    return (
        // TODO: делигировать события на родителя(div)
        <div className={cl(c.header)}>
            <p className={cl(c.name)} onClick={() => props.onSort('name')}>NAME</p>
            <p className={cl(c.type)} onClick={() => props.onSort('type')}>TYPE</p>
            <p className={cl(c.status)} onClick={() => props.onSort('status')}>STATUS</p>
            <p className={cl(c.site)} onClick={() => props.onSort('url')}>SITE</p>
        </div>
    );
};