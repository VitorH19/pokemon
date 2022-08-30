import { useEffect, useState } from 'react';
import axios, {AxiosResponse} from "axios";

import { fitToMask } from 'react-masked';

export function capitalizeFirstLetter(str: string) {
  if (typeof(str) != 'string') return;

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function addCommaBeforeLastNumber(number: number) {
  if (number == null) return;
  const string = number.toString();
  if (string.length === 1) return fitToMask(string, '0.9');
  else if (string.length === 2) return fitToMask(string, '9.9');
  else if (string.length === 3) return fitToMask(string, '99.9');
  else if (string.length === 4) return fitToMask(string, '999.9');
}

export function formatID(id: number) {
  if (id == null) return;

  const string = id.toString();
  if (string.length === 1) return fitToMask(string, '009');
  else if (string.length === 2) return fitToMask(string, '099');
  else if (string.length >= 3) return string;
}

// Object containing all the pokemon type colors
const typeColors = {
  bug: "#73a040",
  dragon: [
    "#53a4cf",
    "#f16e57",
  ],
  fairy: "#fdb9e9",
  fire: "#fd7d24",
  ghost: "#7b62a3",
  ground : [
    "#f7de3f",
    "#ab9842",
  ],
  normal: "#a4acaf",
  psychic: "#f366b9",
  steel: "#9eb7b8",
  dark: "#707070",
  electric: "#eed535",
  fight: "#d56723",
  flying: [
    "#3dc7ef",
    "#bebab9",
  ],
  grass: "#9ccd51",
  ice: "#51c4e7",
  poison: "#b97fc9",
  rock: "#a38c21",
  water: "#4592c4",
};

// This function should be used in a style prop to set the background color depending on the type parameter
export function setTypeBackgroundColor(type: string) {
  if (type === (null || "")) return;
  
  return typeColors[type]
};


const useAxiosFetch = (url: string, timeout?: number) => {
    const [data, setData] = useState<AxiosResponse | null>(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unmounted = false;
        let source = axios.CancelToken.source();
        axios.get(url, {
            cancelToken: source.token,
            timeout: timeout
        })
            .then(a => {
                if (!unmounted) {
                    // @ts-ignore
                    setData(a.data);
                    setLoading(false);
                }
            }).catch(function (e) {
            if (!unmounted) {
                setError(true);
                setErrorMessage(e.message);
                setLoading(false);
                if (axios.isCancel(e)) {
                    console.log(`request cancelled:${e.message}`);
                } else {
                    console.log("another error happened:" + e.message);
                }
            }
        });
        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };
    }, [url, timeout]);

    return {data, loading, error, errorMessage};
};

export default useAxiosFetch;