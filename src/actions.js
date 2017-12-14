import SendBird from 'sendbird';

const sendbird = new SendBird({
  appId: 'A5F11A82-49D5-4712-8BC7-7FBA2B6EA605'
})

const fetchChannels = (dispatch) => () => {
  const payload = new Promise((resolve, reject) => {
    sendbird.OpenChannel.createOpenChannelListQuery().next((ch, err) => {
      resolve(ch);
    })
  });
  return dispatch({
    type: 'FETCH_CHANNELS', 
    payload
  });
}


export default function mapDispatchToProps(dispatch) {
  return {
    connect: (userId) => {
      const payload = new Promise((resolve, reject) => {
        sendbird.connect(userId, (u, err) => {
          resolve(u);
        });
      });
      return dispatch({
        type: 'CONNECTION',
        payload
      })
      .then(fetchChannels(dispatch));
    },
    createChannel: (name) => {
      const payload = new Promise((resolve, reject) => {
        sendbird.OpenChannel.createChannel(name, name, '', (ch, err) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          else if (ch) {
            console.log("ch: ", ch)
            resolve(ch);
          }
      });
      })
      return dispatch(
        {
          type: 'CREATE_CHANNEL',
          payload
        });
  },
      selectChannel: (ch) => {
        dispatch({
          type: 'SELECT_CHANNEL',
          channel: ch
        });
  }
  
}
}