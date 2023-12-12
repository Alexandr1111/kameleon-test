import React, {FC} from 'react';
import {Table} from "./Table/Table";
import cl from "classnames";
import c from './App.module.scss'

const App:FC = () => {
    return (
        <div className={cl(c.app)}>
            <Table />
        </div>
    )
}

export default App;
