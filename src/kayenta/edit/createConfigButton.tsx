import * as React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import * as Creators from '../actions/creators';
import { buildNewConfig } from '../service/canaryConfig.service';
import { ICanaryState } from '../reducers/index';

interface ICreateConfigButtonStateProps {
  disabled: boolean;
  config: string;
}

interface ICreateConfigButtonDispatchProps {
  createNewConfig: (event: any) => void;
}

/*
* Button for creating a new canary config.
*/
function CreateConfigButton({ createNewConfig, disabled, config }: ICreateConfigButtonDispatchProps & ICreateConfigButtonStateProps) {
  return (
    <button className="passive" data-config={config} disabled={disabled} onClick={createNewConfig}>Add configuration</button>
  );
}

function mapStateToProps(state: ICanaryState): ICreateConfigButtonStateProps {
  return {
    disabled: state.selectedConfig.config && state.selectedConfig.config.isNew,
    config: JSON.stringify(buildNewConfig(state)),
  };
}

function mapDispatchToProps(dispatch: (action: Action & any) => void): ICreateConfigButtonDispatchProps {
  return {
    createNewConfig: (event: any) => {
      dispatch(Creators.selectConfig({ config: JSON.parse(event.target.dataset.config) }));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateConfigButton);
