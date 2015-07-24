import {targetToRect} from "../../../model/lib/target_to_rect";
import {OBJECT_TYPE} from "../../../model/gridview/object-type";
import {SelectInfo} from "../../../model/lib/select";

function enterDown(e, props){
  const opeModel = props.opeModel;

  // 選択ターゲットを取得
  const selectItem = opeModel.selectItem;

  if (!selectItem){
    return true;
  }

  if(selectItem.objectType !== OBJECT_TYPE.CELL){
    return true;
  }

  // 選択セルを下へ移す
  const target = selectItem.target.setRowNo(selectItem.target.rowNo + 1);
  const rect = targetToRect(props.viewModel, target, opeModel.scroll);
  const newSelectItem = new SelectInfo(selectItem.objectType, target, null, rect);

  // 入力状態を解除する
  const input = opeModel.input.setIsInputing(false);

  // 新規操作オブジェクトを作る
  const newOpeModel = opeModel
    .setSelectItem(newSelectItem)
    .setInput(input);

  props.onStateChange(props.viewModel, newOpeModel);
  return false;
}

export{
  enterDown
};