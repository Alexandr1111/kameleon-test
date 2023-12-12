import React, {useEffect, useState} from 'react';
import {api, Site, Test} from "./api/api";
import Row from "./components/Table/Row/Row";

export type TestWithUrl = Test & {url: string};

const App = () => {
  const [tableData, setTableData] = useState<TestWithUrl[]>([]);

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
  }, [])

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <input type="text"/>

      <div className={'table'} style={{border: '1px solid red'}}>
          {tableData.map((item: TestWithUrl) => {
              return <Row />
              return (
                  <div style={{display: 'flex'}}>
                    <div style={{background: 'orange', width: '400px'}}>{item.name}</div>
                    <div style={{background: 'lightsalmon', width: '100px'}}>{item.type}</div>
                    <div style={{background: 'lightcyan',  width: '100px'}}>{item.status}</div>
                    <div style={{background: 'lightcyan',  width: '250px'}}>{item.url}</div>
                    <div>Results</div>
                  </div>
              )
          })}
      </div>

    </div>
  );
}

export default App;
