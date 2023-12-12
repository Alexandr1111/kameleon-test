import React, {FC} from 'react';
import {TestWithUrl} from "../App";
import cl from 'classnames';
import c from './Row.module.scss'

type TRow = Omit<TestWithUrl, 'siteId'>

export const Row:FC<TRow> = ({id, type, name, status, url}) => {
    return (
        <div className={cl(c.row)}>
            <p className={cl(c.name)}>{name}</p>
            <p className={cl(c.type)}>{type}</p>
            <p className={cl(c.status)}>{status}</p>
            <p className={cl(c.site)}>{url}</p>
            <p className={cl(c.actionBtn)}>Results</p>
        </div>
    );
};
