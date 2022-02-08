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
  const [to, setTo] = useState('');
  const [outputUSD, setOutputUSD] = useState('');
  const [outputEUR, setOutputEUR] = useState('');

  useEffect(() => {
    API.fetchCurrencyList().then(data => {
      setOptions(Object.keys(data.currencies));
    });
  }, []);

  useEffect(() => {
    if (!to) {
      return;
    }
    API.fetchCurrencyConvension(fromUSD, to, 1)
      .then(data => {
        setOutputUSD(data.rates[to].rate_for_amount);
      })
      .catch(err => {
        toast.error(err);
      });
  }, [fromUSD, to]);

  useEffect(() => {
    if (!to) {
      return;
    }
    API.fetchCurrencyConvension(fromEUR, to, 1)
      .then(data => {
        setOutputEUR(data.rates[to].rate_for_amount);
      })
      .catch(err => console.log(err));
  }, [fromEUR, to]);

  const convertasion = output => {
    if (output) {
      const coin = output.split('.')[1];
      const gain =
        Number(coin[0]) === 0 && Number(coin[1]) === 0
          ? output
          : Number(output).toFixed(2);
      return gain;
    }
  };

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
        {outputUSD && (
          <p>
            1 {fromUSD} = {convertasion(outputUSD)} {to}
          </p>
        )}
        {outputEUR && (
          <p>
            1 {fromEUR} = {convertasion(outputEUR)} {to}
          </p>
        )}
      </div>
    </>
  );
}
