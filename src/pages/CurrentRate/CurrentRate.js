import { useEffect, useState } from 'react';
import 'react-dropdown/style.css';
import * as API from 'services/api';
import s from './CurrentRate.module.scss';
import Dropdown from 'react-dropdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CurrentRate() {
  const [options, setOptions] = useState([]);
  const [fromUSD, setFromUSD] = useState('USD');
  const [fromEUR, setFromEUR] = useState('EUR');
  const [to, setTo] = useState('UAH');
  const [outputUSD, setOutputUSD] = useState(0);
  const [outputEUR, setOutputEUR] = useState(0);

  useEffect(() => {
    API.fetchCurrencyList().then(data => {
      setOptions(Object.keys(data.currencies));
    });
  }, []);

  useEffect(() => {
    API.fetchCurrencyConvension(fromUSD, to, 1)
      .then(data => {
        setOutputUSD(data.rates[to].rate_for_amount);
      })
      .catch(err => {
        toast.error(`${err}. Please repeat your request tomorrow`);
      });
  }, [to]);

  useEffect(() => {
    API.fetchCurrencyConvension(fromEUR, to, 1)
      .then(data => {
        setOutputEUR(data.rates[to].rate_for_amount);
      })
      .catch(err => console.log(err));
  }, [to]);

  const convertasion1 = Number(outputUSD).toFixed(2);
  const convertasion2 = Number(outputEUR).toFixed(2);

  return (
    <>
      <div className={s.currentRate}>
        <div className={s.centre}>
          <h3>Current Rate</h3>
          <h3>to</h3>

          <Dropdown
            options={options}
            onChange={e => {
              setTo(e.value);
            }}
            value={to}
            placeholder="To"
          />
        </div>
        <p>
          1 {fromUSD} = {convertasion1} {to}
        </p>
        <p>
          1 {fromEUR} = {convertasion2} {to}
        </p>
      </div>
    </>
  );
}
