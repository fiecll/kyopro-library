/* encode: ランレングス圧縮を行う
    str内には数字が出現しないと仮定
*/
string encode(const string& str) {
    int n = (int)str.size();
    string ret = ""; // 答えを格納
    for (int l = 0; l < n;) {
        int r = l + 1;
        for (; r < n && str[l] == str[r]; r++) {};
        ret.push_back(str[l]);
        string num_str = to_string(r - l); // 出現回数
        ret += num_str;
        l = r;
    }
    return ret;
}

/* decode: ランレングス圧縮の復元を行う
    元の文字列には数字が出現しないと仮定
*/
string decode(const string& str) {
    int n = (int)str.size();
    string ret = ""; // 答えを格納
    for (int l = 0; l < n;) {
        int r = l + 1;
        for (; r < n && '0' <= str[r] && str[r] <= '9'; r++) {};
        int num = stoi(str.substr(l + 1, r - l)); // 出現回数
        for (int i = 0; i < num; i++) {
            ret.push_back(str[l]);
        }
        l = r;
    }
    return ret;
}