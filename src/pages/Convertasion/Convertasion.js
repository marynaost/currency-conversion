import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from 'services/api';
import s from './Convertasion.module.scss';

export default function Convertasion() {
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('UAH');
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    API.fetchCurrencyList().then(data => {
      setOptions(Object.keys(data.currencies));
    });
  }, []);

  useEffect(() => {
    API.fetchCurrencyConvension(from, to, input)
      .then(data => {
        setOutput(data.rates[to].rate_for_amount);
      })
      .catch(err => {
        toast.error(`${err}. Please repeat your request tomorrow`);
      });
  }, [from, input, to]);

  function flip() {
    setFrom(to);
    setTo(from);
  }

  function inputValue(e) {
    if (e.target.value === '') {
      setInput(0);
      return;
    }
    setInput(e.target.value);
  }

  const convertasion = Number(output).toFixed(2);

  return (
    <div className={s.convertasion}>
      <h1>Currency converter</h1>
      <div className={s.container}>
        <div>
          <h3>Amount</h3>
          <input
            className={s.input}
            type="text"
            placeholder="Enter the amount"
            onChange={e => inputValue(e)}
          />
        </div>
        <div className={s.middle}>
          <h3>From</h3>
          <Dropdown
            options={options}
            onChange={e => {
              setFrom(e.value);
            }}
            value={from}
            placeholder="From"
          />
        </div>
        <div className={s.switch}>
          <HiSwitchHorizontal
            size="30px"
            onClick={() => {
              flip();
            }}
          />
        </div>
        <div className={s.right}>
          <h3>To</h3>
          <Dropdown
            options={options}
            onChange={e => {
              setTo(e.value);
            }}
            value={to}
            placeholder="To"
          />
        </div>
      </div>
      <div className={s.amount}>
        <h2>Converted Amount:</h2>
        <p>
          {input} {from} = {convertasion} {to}
        </p>
      </div>
    </div>
  );
}
