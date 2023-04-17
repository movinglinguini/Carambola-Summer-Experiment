```python
import random
```

# Generate NPCs

This notebook randomly generates NPCs for the [Carambola summer experiment](https://drive.google.com/drive/u/0/folders/1WdmqilUzFeihchQEeGlwF4urL9DTJ19H). Two kinds of NPCs are generated:

1. NPCs with completely random values
2. NPCs with co-related values


```python
values_arr = [ 'power', 'achievement', 'hedonism', 'stimulation', 'self-direction', 'universalism', 'benevolence', 'conformity-tradition', 'security' ]
values_idx = list(range(len(values_arr)))
```

## 1. NPCs with random values


```python
npc_control = []
for i in range(3):
    cherished_arr = random.sample(values_idx, k=3)
    possible_despised = [ idx for idx in values_idx if not idx in cherished_arr  ]
    despised_arr = random.sample(possible_despised, k=3)
    
    npc_control.append({
        'cherishes': cherished_arr,
        'despises': despised_arr
    })

    
display(npc_control)
```


    [{'cherishes': [3, 7, 2], 'despises': [0, 6, 5]},
     {'cherishes': [0, 3, 5], 'despises': [6, 4, 2]},
     {'cherishes': [0, 4, 6], 'despises': [3, 1, 5]}]


## 2. NPCs with co-related values


```python
def getOppositeIdx(idx, arr):
    opposite = idx - (len(arr) // 2)
    
    if opposite < 0:
        opposite = len(arr) + opposite
        
    return opposite
```


```python
npc_interv = []
for i in range(3):
    cherished_arr = []
    despised_arr = []
    
    c1 = random.choice(values_idx)
    c2 = c1 - 1 if c1 > 0 else len(values_idx) - 1
    c3 = c1 + 1 if c1 < len(values_idx) - 1 else 0
    
    cherished_arr = [ c1, c2, c3 ]
    
    d1 = getOppositeIdx(c1, values_idx)
    d2 = d1 - 1 if d1 > 0 else len(values_idx) - 1
    d3 = d1 + 1 if d1 < len(values_idx) - 1 else 0
    
    despised_arr = [ d1, d2, d3 ]
    
    npc_interv.append({
        'cherishes': cherished_arr,
        'despises': despised_arr
    })
display(npc_interv)
```


    [{'cherishes': [8, 7, 0], 'despises': [4, 3, 5]},
     {'cherishes': [6, 5, 7], 'despises': [2, 1, 3]},
     {'cherishes': [1, 0, 2], 'despises': [6, 5, 7]}]



```python

```
