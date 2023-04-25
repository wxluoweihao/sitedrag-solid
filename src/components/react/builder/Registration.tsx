/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React from 'react';
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Registration() {
  const [agreed, setAgreed] = useState(false);
  const [registFormIsHide, setHideRegistForm] = useState("");
  const [accInfo, setAccInfo] = useState("{}");
  let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20}$)");
  let phoneNumRegex = new RegExp("^ [0-9]*$");
  let userIdRegex = new RegExp("(?=\\S+$)(?=.{8,20}$)");
//   const [inviteCodeIsFilled, setInviteCodeIsFilled] = useState(false);
  
    console.log(agreed);
  const handleAgreementButton = () => {
    setAgreed(!agreed);
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    let accountId = document.getElementById("regist-account") as HTMLInputElement;
    let password = document.getElementById("regist-password") as HTMLInputElement;
    let phoneNum = document.getElementById("regist-tel") as HTMLInputElement;
    let inviteCode = document.getElementById("regist-invite-code") as HTMLInputElement;

    let accountIdEmpty = document.getElementById("regist-alert-account") as HTMLElement;
    let accountIdErr = document.getElementById("regist-alert-account-err") as HTMLElement;
    let passwordEmpty = document.getElementById("regist-alert-password") as HTMLElement;
    let passwordErr = document.getElementById("regist-alert-password-err") as HTMLElement;
    let phoneNumEmpty = document.getElementById("regist-alert-tel") as HTMLElement;
    let phoneNumErr = document.getElementById("regist-alert-tel-err") as HTMLElement;
    let inviteCodeErr = document.getElementById("regist-alert-invite-code-err") as HTMLElement;
    let inviteCodeEmpty = document.getElementById("regist-alert-invite-code-empty") as HTMLElement;
    let agreeButEmpty = document.getElementById("regist-alert-button") as HTMLElement; 


    var infoIsValid = true;
    if(accountId.value == "") {
        accountIdEmpty.className = accountIdEmpty.className.replaceAll("hidden", "");
        infoIsValid = false;
    } else {
        accountIdEmpty.className = accountIdEmpty.className.replaceAll("hidden", "").concat("hidden");

        if(userIdRegex.test(accountId.value)) {
            accountIdErr.className = accountIdEmpty.className.replaceAll("hidden", "").concat("hidden");
        } else {
            accountIdErr.className = accountIdErr.className.replaceAll("hidden", "");
            infoIsValid = false;
        }
    }

    

    if(password.value == "") {
        passwordEmpty.className = passwordEmpty.className.replaceAll("hidden", "");
        infoIsValid = false;
    } else {
        passwordEmpty.className = passwordEmpty.className.replaceAll("hidden", "").concat("hidden");

        if(passwordRegex.test(password.value)) {
            passwordErr.className = passwordErr.className.replaceAll("hidden", "").concat("hidden");
        } else {
            passwordErr.className = passwordErr.className.replaceAll("hidden", "");
            infoIsValid = false;
        }
    }



    if(phoneNum.value == "") {
        phoneNumEmpty.className = phoneNumEmpty.className.replaceAll("hidden", "");
        infoIsValid = false;
    } else {
        phoneNumEmpty.className = phoneNumEmpty.className.replaceAll("hidden", "").concat("hidden");

        if(phoneNum.value.length < 11 || phoneNum.value.length > 11 || phoneNumRegex.test(phoneNum.value)) {
            phoneNumErr.className = phoneNumErr.className.replaceAll("hidden", "");
            infoIsValid = false;
        } else {
            phoneNumErr.className = phoneNumErr.className.replaceAll("hidden", "").concat("hidden");
        }
    }

    
    if(inviteCode.value == "") {
        inviteCodeEmpty.className = inviteCodeEmpty.className.replaceAll("hidden", "");
        inviteCodeErr.className = inviteCodeEmpty.className.replaceAll("hidden", "").concat("hidden");
        infoIsValid = false;
    } else {
        inviteCodeEmpty.className = inviteCodeEmpty.className.replaceAll("hidden", "").concat("hidden");
    }

    if(agreed) {
        agreeButEmpty.className = inviteCodeErr.className.replaceAll("hidden", "").concat("hidden");
    } else {
        agreeButEmpty.className = inviteCodeErr.className.replaceAll("hidden", "");
        infoIsValid = false;
    }

    if(infoIsValid) {
        //setHideRegistForm("hidden");
    }
  };


  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className={registFormIsHide}>
            <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
            >
                <div
                className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4677e0] to-[#1141dd] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                style={{
                    clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">用户注册</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                目前仅支持手机号注册, 未来将提供更多的注册方式。
                </p>
            </div>
            <form onSubmit={handleFormSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="regist-account" className="block text-sm font-semibold leading-6 text-gray-900">
                            账号(必填)
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="regist-account"
                                id="regist-account"
                                autoComplete="regist-account"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <p id="regist-alert-account" className="text-red-600 hidden">请填写账号</p>
                        <p id="regist-alert-account-err" className="text-red-600 hidden">输入的账号不满足要求</p>
                        <ul className="block list-disc text-xs font-semibold leading-6 text-gray-900 pl-3">
                            <li>长度须6位以上, 20位以下</li>
                            <li>不能包含空格</li>
                        </ul>
                    </div>
                <div>
                    <label htmlFor="regist-password" className="block text-sm font-semibold leading-6 text-gray-900">
                        密码(必填)
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="password"
                            name="regist-password"
                            id="regist-password"
                            autoComplete="password"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <p id="regist-alert-password" className="text-red-600 hidden">请填写密码</p>
                    <p id="regist-alert-password-err" className="text-red-600 hidden">输入的密码不满足要求</p>
                    <ul className="block list-disc text-xs font-semibold leading-6 text-gray-900 pl-3">
                        <li>长度须6位以上, 20位以下</li>
                        <li>包含至少1个大写字母</li>
                        <li>包含至少1个小写字母</li>
                        <li>包含至少1个特殊符号(!@#$%&*()-+=^)</li>
                        <li>包含至少1个数字</li>
                        <li>不能包含空格</li>
                    </ul>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="regist-tel" className="block text-sm font-semibold leading-6 text-gray-900">
                    手机号码(必填, 仅支持受邀者手机号)
                    </label>
                    <div className="relative mt-2.5">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <label htmlFor="country" className="sr-only">
                        国家
                        </label>
                        <select
                        id="regist-tel-country"
                        name="regist-tel-country"
                        className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                        >
                        <option>+86</option>
                        </select>
                        <ChevronDownIcon
                        className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                        aria-hidden="true"
                        />
                    </div>
                    <input
                        type="tel"
                        name="regist-tel"
                        id="regist-tel"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    <p id="regist-alert-tel" className="text-red-600 hidden">请填写受邀的手机号码</p>
                    <p id="regist-alert-tel-err" className="text-red-600 hidden">请填写有效的手机号码</p>
                </div>
                <div>
                    <label htmlFor="regist-invite-code" className="block text-sm font-semibold leading-6 text-gray-900">
                    体验邀请码(必填)
                    </label>
                    <div className="mt-2.5">
                        <input
                            type="text"
                            name="regist-invite-code"
                            id="regist-invite-code"
                            autoComplete="invite-code"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                        <p id="regist-alert-invite-code-err" className="text-red-600 hidden">请填写正确的邀请码</p>
                        <p id="regist-alert-invite-code-empty" className="text-red-600 hidden">请填写邀请码</p>
                    </div>
                </div>
                <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                    <div className="flex h-6 items-center">
                        <Switch
                            checked={agreed}
                            onChange={handleAgreementButton}
                            className={classNames(
                            agreed ? 'bg-blue-600' : 'bg-gray-200',
                            'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                            )}
                        >

                            <span
                            aria-hidden="true"
                            className={classNames(
                                agreed ? 'translate-x-3.5' : 'translate-x-0',
                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                            )}
                            />
                        </Switch>
                    </div>
                    <Switch.Label className="text-sm leading-6 text-slate-600">
                        登录账号网站需要在本地设置cookie, 点击 {' '}
                    <a className="font-semibold text-blue-600">
                        表示同意
                    </a>
                    .
                    <p id="regist-alert-button" className="text-red-600 hidden">需要点击以上按钮表示同意, 才能继续注册</p>
                    </Switch.Label>
                </Switch.Group>
                </div>
                <div className="mt-10">
                <button
                    type="submit"
                    className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    注册
                </button>
                </div>
            </form>
        </div>
    </div>
  )
}
