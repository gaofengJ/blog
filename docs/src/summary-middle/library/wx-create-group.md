---
title: 企微一键拉群方案
description: 工程化
---

## 背景

项目中有一个一键拉群的需求，在开发、调试的过程中遇到了不少坑，最终形成了一套相对成熟的方案，供大家参考。

## 方案

微信JS-SDK目前不提供在浏览器中打开群聊的能力（目前只开放了[打开个人聊天窗口Schema](https://developer.work.weixin.qq.com/document/path/94346)），且在浏览器中无法调用JS-SDK中的相关API，所以只能借助后端调用企微客户端API（[创建群聊会话](https://developer.work.weixin.qq.com/document/path/90245)、[应用推送消息](https://developer.work.weixin.qq.com/document/path/90248)）生成群聊，前端辅以成功提示。

而在企业微信中，为了保持生成群聊的一致性，依然由后端利用客户端API生成群聊，待群聊生成后前端调用[打开已有群聊](https://developer.work.weixin.qq.com/document/path/94518)直接跳转。

### 小结

浏览器中：后端调用客户端API生成群聊并发送消息，前端提示用户手动打开

企微中：后端调用客户端API生成群聊并发送消息，前端调用打开已有群聊直接跳转

## 代码

```js
// 一键拉群弹窗确定
const handleConfirm = async (id, peopleList: string[]) => {
  try {
    const { data } = await createGroupWechat({
      id,
      peopleList,
      url: window.location.href,
    });
    const chatId = data;
    if (isWx()) {
      openExistedChatWithMsg(chatId);
    } else {
      message.success('群聊生成成功，请自行打开～');
    }
  } catch (e) {
    console.info(e);
  }
};

// 注入权限验证
export const setWxConfig = async () => {
  try {
    const { code, data } = await getWxSignature(window.location.href);
    if (code) return;
    wx.config({
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.corpid, // 必填，企业微信的corpID
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
      jsApiList: wxJsAPIList, // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    });
    wx.error((res: any) => {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.info('wx.config.error', res);
    });
  } catch (error) {
    console.info(error);
  }
};

// 注入应用权限
export const setWxAgentConfig = async () => {
  const { code, data } = await getWxAgentSignature(window.location.href);
  if (code) return null;
  return new Promise((resolve) => {
    wx.ready(() => {
      try {
        wx.agentConfig({
          corpid: data.corpid, // 必填，企业微信的corpID
          agentid: data.agentid, // 必填， 应用的agentid
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
          jsApiList: wxJsAPIList, // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
          success: () => {
            resolve(true);
          },
          fail: (e: any) => {
            console.info('wx.agentConfig.fail', e);
          },
        });
      } catch (e) {
        console.info('wx.agentConfig', e);
      }
    });
  });
};

// 打开已有会话
export const openExistedChatWithMsg = async (chatId: string) => {
  await setWxConfig();
  await setWxAgentConfig();
  wx.invoke('openExistedChatWithMsg', {
    chatId,
  });
};
```

## 注意事项

* **目前一键拉群的调试必须在线上域名中进行，可参考[企微JS-SDK调试方案](../engineering/wx-js-sdk-local-debugging.md)**
* **调用openExistedChatWithMsg前必须先调用wx.agentConfig**
* **在调用后端接口生成群聊与跳转群聊的过程中，如果衔接比较生硬，建议添加loading效果**
