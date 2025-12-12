import { useCallback, useMemo, useState } from 'react'
import { UrpButton } from '../Button/index.ts'
import { UrpCheckBox } from '../CheckBox/index.ts'
import './style.less'

/**
 * Transfer 穿梭框组件（默认导出）
 */
const UrpTransfer = (props) => {
  const [sourceList, setSourceList] = useState(props.data)
  const [selectedList, setSelectedList] = useState([]) as any

  const [toRightList, setToRightList] = useState([])
  const [toLeftList, setToLeftList] = useState([])

  const [leftCheckedList, setLeftCheckedList] = useState([])
  const [rightCheckedList, setRightCheckedList] = useState([])

  const isLeftCheckAll = useMemo(() => {
    return (sourceList.length === leftCheckedList.length) && leftCheckedList.length
  }, [sourceList, leftCheckedList])

  const isRightCheckAll = useMemo(() => {
    return (selectedList.length === rightCheckedList.length) && rightCheckedList.length
  }, [selectedList, rightCheckedList])

  const transferToRight = () => {
    const targetItems = toRightList
      .map(item => sourceList.find(_item => _item.value === item))
      .filter(Boolean)
    setSelectedList((prev) => [...prev, ...targetItems])
    setSourceList((prev) => {
      return prev.filter(item => !toRightList.includes(item.value))
    })
    setLeftCheckedList([])
    setToRightList([])
  }

  const transferToLeft = () => {
    // 是不是应该加一个穿梭前校验
    const targetItems = toLeftList
      .map(item => selectedList.find(_item => _item.value === item))
      .filter(Boolean)
    setSourceList((prev) => [...prev, ...targetItems])
    setSelectedList((prev) => {
      return prev.filter(item => !toLeftList.includes(item.value))
    })
    setRightCheckedList([])
    setToLeftList([])
  }

  const onSingleTransferChange = (newValue, changed, which) => {
    if (which === 'left') {
      setToRightList(newValue)
      setLeftCheckedList(newValue)
    } else {
      setToLeftList(newValue)
      setRightCheckedList(newValue)
    }
  }

  const onCheckAll = (value, which) => {
    if (which === 'left') {
      if (!isLeftCheckAll) {
        setToRightList(value.map(item => item.value))
        setLeftCheckedList(value.map(item => item.value))
      } else {
        setToRightList([])
        setLeftCheckedList([])
      }
    } else {
      if (!isRightCheckAll) {
        setToLeftList(value.map(item => item.value))
        setRightCheckedList(value.map(item => item.value))
      } else {
        setToLeftList([])
        setRightCheckedList([])
      }
    }
  }
  return(
    <div className='u-transfer'>
      {/* 左侧数据源 */}
      <UrpSingleTransfer
        data={sourceList}
        checkedList={leftCheckedList}
        isCheckAll={isLeftCheckAll}
        onChange={
          (newValue, changed) => {
            onSingleTransferChange(newValue, changed, 'left')
          }
        }
        onCheckAll={(value) => onCheckAll(value, 'left')}
      />
      {/* 穿梭按键 */}
      <UrpTansferButtons 
        transferToLeft={transferToLeft}
        transferToRight={transferToRight}
      />
      {/* 右侧选中区 */}
      <UrpSingleTransfer 
        data={selectedList}
        checkedList={rightCheckedList}
        isCheckAll={isRightCheckAll}
        onChange={
          (newValue, changed) => {
            onSingleTransferChange(newValue, changed, 'right')
          }
        }
        onCheckAll={(value) => onCheckAll(value, 'right')}
      />
    </div>
  )
}

/**
 * 单个穿梭框
 */
const UrpSingleTransfer = (props) => {

  const handleCheckBoxChange = useCallback((value) => {
    props.onChange(value)
  }, [props])

  const handleCheckAll = useCallback(() => {
    props.onCheckAll(props.data)
  }, [props])

  return(
    <div className='u-single-transfer'>
      <div className='u-single-transfer-head'>
        <UrpCheckBox.Group
            onChange={handleCheckAll}
            multiple
            cancelable
            value={props.isCheckAll ? ['0'] : []}
          >
            <UrpCheckBox.Item value='0'>
              <UrpCheckBox.Label>{props.checkedList.length}/{props.data.length}</UrpCheckBox.Label>
            </UrpCheckBox.Item>
          </UrpCheckBox.Group>
        <div></div>
      </div>
      <div className='u-single-transfer-body'>
        {
          <UrpCheckBox.Group 
            onChange={handleCheckBoxChange} 
            value={props.checkedList}
            cancelable 
            multiple
          >
            {
              props.data.map((item) => {
                return(
                  <div key={item.value}>
                    <UrpCheckBox.Item value={item.value}>
                      <UrpCheckBox.Label>{ item.label }</UrpCheckBox.Label>
                    </UrpCheckBox.Item>
                  </div>
                )
              })
            }
          </UrpCheckBox.Group>
          
        }
      </div>
      <div className='u-single-transfer-footer'></div>
    </div>
  )
}

const UrpTansferButtons = (props) => {
  return(
    <div className='u-transfer-buttons'>
      <UrpButton onClick={props.transferToRight} variant='outline' theme='default' size='small' icon='RightOutlined' purIcon />
      <UrpButton onClick={props.transferToLeft} variant='outline' theme='default' size='small' icon='LeftOutlined' purIcon />
    </div>
  )
}

export default UrpTransfer
