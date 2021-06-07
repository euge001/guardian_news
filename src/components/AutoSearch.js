import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";
import { stateOptions } from "./data";
import _ from "lodash";

export default class SingleSelect extends Component {
  getAsyncOptions(inputValue) {
    return new Promise((resolve, reject) => {
      const filtered = _.filter(stateOptions, o =>
        _.startsWith(_.toLower(o.label), _.toLower(inputValue))
      );
      resolve(filtered.slice(0, 3));
    });
  }

  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          defaultOptions
          isClearable
          className="basic-single"
          classNamePrefix="select"
          name="search"
          loadOptions={inputValue => this.getAsyncOptions(inputValue)}
        />
      </div>
    );
  }
}
