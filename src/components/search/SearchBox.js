import * as React from 'react';
import {useEffect, useState} from "react";
import axios from 'axios';
import SearchResult from "./SearchResult";

export default () => {
    const [term, setTerm] = useState('React');
    const [result, setResult] = useState([]);

    useEffect(() => {
        // Created inner function as useEffect function doesn't support async
        const search = async () => {
            const response = await axios.get('http://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                }
            });

            setResult(response.data.query.search);
        }
        // If user clears search text, then remove result
        if (!term) {
            setResult([]);
        }

        if (term && !result.length) {
            search();
        } else {
            // Wait for 1 second while user it typing
            // if user stops typing for 1 second, then make the request
            // Get time out id and clear time interval if user types within a second
            const timeoutId = setTimeout(() => {
                if (term) {
                    search();
                }
            }, 1000);

            return () => {
                clearTimeout(timeoutId);
            }
        }

    }, [term]);

    return (
        <div>
            <h1 className="display-4">Wikipedia Search</h1>
            <br/>
            <label htmlFor={'search-btn'} className='lead'>Enter search term</label>
            <br/>
            <input className={'form-control'} id={'search-btn'} type='text' value={term} onChange={(e) => setTerm(e.target.value)}/>

            <div className='list-group'>
            {result.map((res, index) => {
              return <SearchResult description={res.snippet} title={res.title} key={index} pageid={res.pageid}></SearchResult>
            })}
            </div>
        </div>
    );
};