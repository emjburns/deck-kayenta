import * as React from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { ICanaryState } from '../reducers';
import * as Creators from '../actions/creators';

interface IGroupNameStateProps {
  group: string;
  edit: string;
  editing: boolean;
}

interface IGroupNameDispatchProps {
  handleSubmit: (event: any) => void;
  handleUpdate: (event: any) => void;
}

interface IGroupNameOwnProps {
  group: string;
  editing: boolean;
  onClick: (event: React.SyntheticEvent<HTMLAnchorElement>) => void;
  defaultGroup: string;
}

/*
 * Configures a group name.
 */
function GroupName({ editing, edit, group, onClick, handleUpdate, handleSubmit, defaultGroup }: IGroupNameStateProps & IGroupNameDispatchProps & IGroupNameOwnProps) {
  if (editing) {
    return (
      <form onSubmit={handleSubmit} data-group={group} data-edit={edit}>
        <input
          autoFocus={true}
          value={edit}
          onChange={handleUpdate}
          className="form-control input-sm"
        />
      </form>
    );
  } else {
    return (
      <a data-group={group} onClick={onClick}>{group || defaultGroup}</a>
    );
  }
}

function mapStateToProps(state: ICanaryState, ownProps: IGroupNameOwnProps): IGroupNameStateProps & IGroupNameOwnProps {
  return {
    edit: state.selectedConfig.group.edit,
    ...ownProps,
  };
}

function mapDispatchToProps(dispatch: (action: Action & any) => void): IGroupNameDispatchProps {
  return {
    handleUpdate: (event: any) => {
      dispatch(Creators.editGroupUpdate({ edit: event.target.value }));
    },
    handleSubmit: (event: any) => {
      dispatch(Creators.editGroupConfirm({ ...event.target.dataset }));
      event.stopPropagation();
      event.preventDefault();
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupName);
