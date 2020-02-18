
class StatusUtils {

  static statusForBadge = status => {
    switch (status) {
      case 'RUNNING' || 'ACTIVE':
      case 'READY':
      case 'READY_UNSCHEDULABLE':
        return 'success';
      case 'DOWN':
      case 'NOTREADY':
      case 'UNAUTHORIZED':
        return 'error';
      default:
        return 'warning';
    }
  }
}

export default StatusUtils;
