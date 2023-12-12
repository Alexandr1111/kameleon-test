import React, {FC} from 'react';
import cl from 'classnames';
import c from './Row.module.scss'
import {TestWithUrl} from "../../types";
import {getStatusColor} from "../../../helpers/getStatusColor";

type TRow = Omit<TestWithUrl, 'siteId'>

export const Row:FC<TRow> = ({ type, name, status, url, id}) => {
    return (
        <div className={cl(c.row)} tabIndex={id}>
            <p className={cl(c.name)}>{name}</p>
            <p className={cl(c.type)}>{type}</p>
            <p className={cl(c.status)} style={{color: getStatusColor(status)}}>{status}</p>
            <p className={cl(c.site)}>{url}</p>
            <p className={cl(c.actionBtn)}>Results</p>
        </div>
    );
};
