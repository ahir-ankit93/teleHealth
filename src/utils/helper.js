import { COUNTIES } from "./constants";
import { DOCTORS } from "./constants";
import { PROVIDERS } from "./constants";
import { DURATIONS } from "./constants";
import { AMOUNTS } from "./constants";
import { CURRENCIES } from "./constants";
import { MONTHS } from "./constants";
import { YEARS } from "./constants";

export const getCountries = () => {
  let countries = COUNTIES.map(country => country.name);
  countries = [...new Set(countries)];
  countries = countries.sort();
  return countries.map(country => {
    return {
      label: country,
      value: country
    };
  });
};

export const getProviders = () => {
  let providers = PROVIDERS.map(provider => provider.name);
  providers = [...new Set(providers)];
  providers = providers.sort();
  return providers.map(provider => {
    return {
      label: provider,
      value: provider
    };
  });
};

export const getDoctorsList = () => {
  let doctors = DOCTORS.map(doctor => doctor.department);
  doctors = [...new Set(doctors)];
  doctors = doctors.sort();
  return doctors.map(doctor => {
    return {
      label: doctor,
      value: doctor
    };
  });
};

export const getDurations = () => {
  let durations = DURATIONS.map(duration => duration.name);
  durations = [...new Set(durations)];
  // durations = durations.sort();
  return durations.map(duration => {
    return {
      label: duration,
      value: duration
    };
  });
};

export const getAmounts = () => {
  let amounts = AMOUNTS.map(amount => amount.name);
  amounts = [...new Set(amounts)];
  amounts = amounts.sort();
  return amounts.map(amount => {
    return {
      label: amount,
      value: amount
    };
  });
};

export const getCurrencies = () => {
  let currencies = CURRENCIES.map(currency => currency.name);
  currencies = [...new Set(currencies)];
  currencies = currencies.sort();
  return currencies.map(currency => {
    return {
      label: currency,
      value: currency
    };
  });
};

export const getMonths = () => {
  let months = MONTHS.map(month => month.name);
  months = [...new Set(months)];
  // months = months.sort();
  return months.map(month => {
    return {
      label: month,
      value: month
    };
  });
};

export const getYears = () => {
  let years = YEARS.map(year => year.name);
  years = [...new Set(years)];
  years = years.sort();
  return years.map(year => {
    return {
      label: year,
      value: year
    };
  });
};
