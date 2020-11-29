import React from "react";

export interface AutoCompleteOptions {
  name: string;
  value: string;
}

export interface AutocompleteState {
  activeOption: number;
  filteredOptions: Array<AutoCompleteOptions>;
  showOptions: boolean;
  userInput: string;
  options: Array<AutoCompleteOptions>;
}

class Autocomplete extends React.Component<null, AutocompleteState> {
  constructor(props) {
    super(props);

    this.state = {
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: "",
      options: [],
    };
  }

  onChange = (e) => {
    const { options } = this.state;
    const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
      (option) =>
        option.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value,
    });
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  onKeyDown = (e) => {
    if (e.defaultPrevented) {
      return; // Should do nothing if the default action has been cancelled
    }

    const { activeOption, filteredOptions } = this.state;
    let handled = false;
    switch (e.code) {
      case "Enter":
        this.setState({
          activeOption: 0,
          showOptions: false,
          userInput: filteredOptions[activeOption].value,
          options: [],
        });
        handled = true;
        break;

      case "ArrowUp":
        if (activeOption === 0) {
          return;
        }
        this.setState({ activeOption: activeOption - 1 });
        handled = true;
        break;

      case "ArrowDown":
        if (activeOption - 1 === filteredOptions.length) {
          return;
        }

        this.setState({ activeOption: activeOption + 1 });
        handled = true;
        break;

      default:
      // Do Nothing.
    }
    if (handled) {
      e.preventDefault();
    }
  };

  refreshOptions() {
    const { userInput } = this.state;
    fetch("/search_api_autocomplete/solr_search?q=".concat(userInput))
      .then((res) => res.json())
      .then((ajaxData) => {
        if (Array.isArray(ajaxData)) {
          this.setState({ options: ajaxData });
        }
      });
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeOption, filteredOptions, showOptions, userInput },
    } = this;

    let optionsListComponent;

    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionsListComponent = (
          <ul className="options">
            {filteredOptions.map((option, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active";
              }

              return (
                <>
                  <li className={className} key={option} onClick={onClick}>
                    {option}
                  </li>
                </>
              );
            })}
          </ul>
        );
      } else {
        optionsListComponent = <ul className="options" />;
      }
    }

    return (
      <>
        <input
          id="edit-keywords"
          name="keywords"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {optionsListComponent}
      </>
    );
  }
}

export default Autocomplete;
