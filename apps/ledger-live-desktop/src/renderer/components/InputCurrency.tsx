import React, { PureComponent } from "react";
import { BigNumber } from "bignumber.js";
import { uncontrollable } from "uncontrollable";
import styled from "styled-components";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { localeSelector } from "~/renderer/reducers/settings";
import { formatCurrencyUnit, sanitizeValueString } from "@ledgerhq/live-common/currencies/index";
import noop from "lodash/noop";
import Box from "~/renderer/components/Box";
import Input, { Props as InputProps } from "~/renderer/components/Input";
import Select from "~/renderer/components/Select";
import { Unit } from "@ledgerhq/types-cryptoassets";

const unitGetOptionValue = (unit: Unit) => String(unit.magnitude);

function format(
  unit: Unit,
  value: BigNumber,
  {
    locale,
    isFocused,
    showAllDigits,
    subMagnitude,
  }: {
    locale: string;
    isFocused: boolean;
    showAllDigits?: boolean;
    subMagnitude?: number;
  },
) {
  return formatCurrencyUnit(unit, value, {
    locale,
    useGrouping: !isFocused,
    disableRounding: true,
    showAllDigits: !!showAllDigits && !isFocused,
    subMagnitude: value.isLessThan(1) ? subMagnitude : 0,
  });
}

const Currencies = styled(Box)`
  top: -1px;
  right: -1px;
  width: 100px;
`;

function stopPropagation(e: React.SyntheticEvent) {
  e.stopPropagation();
}

type OwnProps = Omit<InputProps, "value" | "onChange"> & {
  onChangeFocus?: (a: boolean) => void;
  onChange: (b: BigNumber, a: Unit) => void;
  // FIXME Unit shouldn't be provided (this is not "standard" onChange)
  onChangeUnit?: (a: Unit) => void;
  renderRight?: React.ReactNode;
  defaultUnit?: Unit;
  unit?: Unit;
  units?: Unit[];
  value: BigNumber | undefined | null;
  showAllDigits?: boolean;
  subMagnitude?: number;
  allowZero?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  decimals?: number;
};

type Props = {
  unit: Unit;
  units: Unit[];
  onChangeFocus: (a: boolean) => void;
  onChangeUnit: (a: Unit) => void;
  locale: string;
  forwardedRef: React.ForwardedRef<HTMLInputElement> | undefined | null;
  placeholder?: string;
  loading: boolean;
} & OwnProps;

type State = {
  isFocused: boolean;
  displayValue: string;
  rawValue: string;
};
class InputCurrency extends PureComponent<Props, State> {
  static defaultProps = {
    onChangeFocus: noop,
    onChange: noop,
    renderRight: null,
    units: [],
    value: null,
    showAllDigits: false,
    subMagnitude: 0,
    allowZero: false,
    autoFocus: false,
    loading: false,
  };

  state = {
    isFocused: false,
    displayValue: "",
    rawValue: "",
  };

  componentDidMount() {
    this.syncInput({
      isFocused: !!this.props.autoFocus,
    });
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { locale, value, showAllDigits, unit } = this.props;
    const needsToBeReformatted =
      !this.state.isFocused &&
      (value !== nextProps.value ||
        showAllDigits !== nextProps.showAllDigits ||
        unit !== nextProps.unit);
    if (needsToBeReformatted) {
      const { isFocused } = this.state;
      this.setState({
        rawValue: "",
        displayValue:
          !nextProps.value || nextProps.value.isNaN() || nextProps.value.isZero()
            ? ""
            : format(nextProps.unit, nextProps.value, {
                locale,
                isFocused,
                showAllDigits: nextProps.showAllDigits,
                subMagnitude: nextProps.subMagnitude,
              }),
      });
    }
  }

  handleChange = (val: string) => {
    const { onChange, unit, value, locale, decimals } = this.props;
    const v = decimals === 0 ? val.replace(/[.,]/g, "") : val;
    const r = sanitizeValueString(unit, v, locale);
    const satoshiValue = BigNumber(r.value);
    if (!value || !value.isEqualTo(satoshiValue)) {
      onChange(satoshiValue, unit);
    }
    this.setState({
      rawValue: v,
      displayValue: r.display,
    });
  };

  handleBlur = () => {
    this.syncInput({
      isFocused: false,
    });
    this.props.onChangeFocus(false);
  };

  handleFocus = () => {
    this.syncInput({
      isFocused: true,
    });
    this.props.onChangeFocus(true);
  };

  syncInput = ({ isFocused }: { isFocused: boolean }) => {
    const {
      showAllDigits,
      subMagnitude,
      unit,
      allowZero,
      locale,
      value: fallbackValue,
    } = this.props;
    const { rawValue } = this.state;
    const value = rawValue
      ? BigNumber(sanitizeValueString(unit, rawValue, locale).value)
      : fallbackValue || "";
    this.setState({
      isFocused,
      displayValue:
        !value || (value.isZero() && !allowZero)
          ? ""
          : format(unit, value, {
              locale,
              isFocused,
              showAllDigits,
              subMagnitude,
            }),
    });
  };

  renderOption = (item: { data: Unit }) => item.data.code;

  renderValue = (item: { data: Unit }) => item.data.code;

  renderListUnits = () => {
    const { units, onChangeUnit, unit } = this.props;
    const { isFocused } = this.state;
    const avoidEmptyValue = (value?: Unit | null) => value && onChangeUnit(value);
    if (units.length <= 1) {
      return null;
    }
    return (
      <Currencies onClick={stopPropagation}>
        <Select
          onChange={avoidEmptyValue}
          options={units}
          value={unit}
          getOptionValue={unitGetOptionValue}
          renderOption={this.renderOption}
          renderValue={this.renderValue}
          fakeFocusRight={isFocused}
          isRight
        />
      </Currencies>
    );
  };

  render() {
    const {
      renderRight,
      showAllDigits,
      unit,
      subMagnitude,
      locale,
      placeholder,
      ...rest
    } = this.props;
    const { displayValue } = this.state;
    return (
      <Input
        {...rest}
        ff="Inter"
        ref={this.props.forwardedRef}
        value={displayValue}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        renderRight={renderRight || this.renderListUnits()}
        loading={this.props.loading}
        placeholder={
          displayValue
            ? ""
            : placeholder ||
              format(unit, BigNumber(0), {
                locale,
                isFocused: false,
                showAllDigits,
                subMagnitude,
              })
        }
      />
    );
  }
}
const Connected = uncontrollable(
  connect(
    createStructuredSelector({
      locale: localeSelector,
    }),
  )(InputCurrency),
  {
    unit: "onChangeUnit",
  },
);
const m: React.ComponentType<OwnProps> = React.forwardRef(function InputCurrency(props, ref) {
  return <Connected {...props} forwardedRef={ref} />;
});
export default m;
