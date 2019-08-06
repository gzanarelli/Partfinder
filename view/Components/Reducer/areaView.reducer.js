export default function (view = '', action) {
    // console.log('action: ', action);
    if (action.type === 'areaView') {
        view = action.page;
        console.log('View: ', view);
        return view;
    } else {
      return view;
    }
  };