import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Row} from "./Row/Row";
import {api, Site, Test} from "../../api/api";
import {TestWithUrl} from "../types";
import cl from "classnames";
import c from './Table.module.scss'
import {Header} from "./Header/Header";

export const Table:FC = () => {
    const [tableData, setTableData] = useState<TestWithUrl[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const getInitialData = async (): Promise<TestWithUrl[]> => {
        return Promise.all([api.getTests(), api.getSites()]).then((values) => {
            const tests: Test[] = values[0];
            const sites: Site[] = values[1];

             return tests.map((test: Test) => {
                const urlItem = sites.find((site: Site) => site.id === test.siteId);
                // вырезаем http, https, www
                const parsedUrl = urlItem ? urlItem.url.replace(/(^\w+:|^)\/\/(www\.)?/,'') : '';
                return { ...test, url: parsedUrl };
            });
        });
    }

    useEffect(() => {
        Promise.all([api.getTests(), api.getSites()]).then((values) => {
            const tests: Test[] = values[0];
            const sites: Site[] = values[1];

            const result: TestWithUrl[] = tests.map((test: Test) => {
                const urlItem = sites.find((site: Site) => site.id === test.siteId);
                // вырезаем http, https, www
                const parsedUrl = urlItem ? urlItem.url.replace(/(^\w+:|^)\/\/(www\.)?/,'') : '';
                return { ...test, url: parsedUrl };
            });

            setTableData(result);
        });
    }, []);

    const handleFilter = async (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toLowerCase();
        setInputValue(inputValue);

        let filteredTableData: TestWithUrl[] = [];

        if (inputValue) {
            filteredTableData = tableData.filter((el: TestWithUrl) => el.name.toLowerCase().startsWith(inputValue));
        } else {
            filteredTableData =  await getInitialData();
        }

        setTableData(filteredTableData);
    }

    const handleReset = async (): Promise<void> => {
        const data = await getInitialData();
        setTableData(data);
        setInputValue('');
    }

    const handleSort = (field: string): void => {
        let sortedTableData: TestWithUrl[] = [];

        sortedTableData = tableData.slice().sort(function(a, b) {
            // @ts-ignore
            if (a[field] < b[field]) {
                return -1;
            }
            // @ts-ignore
            if (a[field] > b[field]) {
                return 1;
            }
            return 0;
        });

        setTableData(sortedTableData);
    }

    return (
        <div className={cl(c.table)}>
            <h1 className={cl(c.header)}>Dashboard</h1>
            <div className={cl(c.inputContainer)}>
                <input
                    className={cl(c.filterField)}
                    type="text"
                    placeholder={'What test are you looking for?'}
                    onChange={(e) => handleFilter(e)}
                    value={inputValue}
                    tabIndex={-1}
                />
                <span className={cl(c.testCount)}>{tableData.length} tests</span>
            </div>

            <div style={{width: '954px'}}>
                {!tableData.length
                    ? <div className={cl(c.empty)}>
                        <p className={cl(c.text)}>Your search did not match any results.</p>
                        <button className={cl(c.button)} onClick={handleReset}>Reset</button>
                      </div>
                    : <>
                        <Header onSort={handleSort} />
                        {tableData.map(({id, status, url, type, name}) => {
                            return <Row
                                type={type}
                                id={id}
                                name={name}
                                status={status}
                                url={url}
                                key={id}
                            />
                        })}
                    </>
                }
            </div>

        </div>
    );
}