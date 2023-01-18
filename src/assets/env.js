/*
 * Copyright 2020-2023 Aion Technology LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(window) {
    window["env"] = window["env"] || {};

    window["env"]["production"] = false
    window["env"]["region"] = "us-west-2"
    window["env"]["apiUri"] = "http://localhost:8080"
    window["env"]["lpgUri"] = "http://localhost:8090"
    window["env"]["baseUri"] = "http://localhost:4200"
    window["env"]["cognitoPoolId"] = "us-west-2_EBQBuK2yn"
    window["env"]["cognitoClientId"] = "50q37ipum07ltgh8grqkl29i2n"
})(this)
