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
  abortController: AbortController;
}

class Autocomplete extends React.Component<null, AutocompleteState> {
  constructor(props) {
    super(props);
    const url = new URL(document.location.href);

    this.state = {
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: url.searchParams.get("keywords"),
      options: [],
      abortController: new AbortController(),
    };
  }

  onClick = (e) => {
    console.debug("Click", e.currentTarget.dataset.value);
    document.location.href = `/search?keywords=`.concat(
      e.currentTarget.dataset.value.toLowerCase()
    );
  };

  onFocus = (e) => {
    e.currentTarget.select();
  };

  onBlur = (e) => {
    console.debug("Blur", e);
  };

  onKeyDown = (e) => {
    if (e.defaultPrevented) {
      return; // Should do nothing if the default action has been cancelled
    }

    if (e.currentTarget.selected) {
      this.setState({
        userInput: "",
      });
    }
    console.debug("Code", e.key);
    const { activeOption, options, showOptions, userInput } = this.state;
    let handled = false;
    switch (e.key) {
      case "Enter":
        if (showOptions === true) {
          this.setState({
            activeOption: 0,
            showOptions: false,
            userInput: options[activeOption].value,
            options: [],
          });
        } else {
          document.location.href = `/search?keywords=`.concat(userInput);
        }

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
        if (activeOption - 1 === options.length) {
          return;
        }

        this.setState({ activeOption: activeOption + 1 });
        handled = true;
        break;

      case "Backspace":
        if (e.currentTarget.selected) {
          this.setState({ userInput: "" });
        } else {
          this.setState({
            userInput: userInput.substr(0, userInput.length - 1),
          });
        }
        handled = true;
        break;

      default:
        this.setState({
          userInput: userInput.concat(`${e.key}`),
        });
        this.refreshOptions();
        handled = true;
    }
    if (handled) {
      e.preventDefault();
    }
  };

  refreshOptions = () => {
    const { userInput, abortController } = this.state;
    const { signal } = abortController;
    fetch("/search_api_autocomplete/solr_search?q=".concat(userInput), {
      signal,
    })
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("back from json", ajaxData);
        if (Array.isArray(ajaxData)) {
          this.setState({
            options: ajaxData,
            showOptions: true,
          });
        }
      });
  };

  render() {
    const {
      onFocus,
      onKeyDown,
      onClick,
      onBlur,
      state: { activeOption, showOptions, userInput, options },
    } = this;

    let optionsListComponent;

    if (showOptions && userInput) {
      if (options.length) {
        optionsListComponent = (
          <ul id="milken-keyword-text-input" className="options">
            {options.map((option, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active";
              }

              return (
                <li
                  className={className}
                  key={option.value}
                  data-value={option.value}
                  onClick={onClick}
                >
                  {option.value}
                </li>
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
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          value={userInput}
          autoComplete="off"
          autoCapitalize="off"
          aria-autocomplete="list"
          aria-owns="milken-keyword-text-input"
        />
        {optionsListComponent}
      </>
    );
  }
}

export default Autocomplete;
