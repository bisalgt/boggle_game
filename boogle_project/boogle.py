from flask import Flask, render_template, redirect, request, session, jsonify
import time
import random
import enchant
d = enchant.Dict("en_US")

app = Flask(__name__)

arr = [['a', 'b', 'c', 'd'],
       ['e', 'f', 'e', 'h'],
       ['i', 'y', 'k', 'l'],
       ['m', 'n', 'o', 'p']]

alphabets = 'abcdefghijklmnopqrstuvwxyz'

# @app.route('/', methods=('GET', 'POST'))
# def check_for_valid_words():
#     if request.method == 'POST':
#         print(request.form['guess'])
#         print(check_string_valid_or_not(request.form['guess']))
#         return redirect('/')
#     return render_template('home.html', arr=arr)

# @app.route('/js', methods=('GET', 'POST'))
# def using_js():
#     if request.method=="POST":
#         print('this function is called ')
#         # print(dir(request))
#         print(request.form)
#         return render_template('index.html')
#     return render_template('index.html')



@app.route('/intermediate')
def intermediate_function():
    return render_template("intermediate.html")

def randomizer():
    global arr
    for r in range(4):
            for c in range(4):
                arr[r][c] = alphabets[random.randint(0,25)]


@app.route('/', methods=("GET", "POST"))
def final_boogle_checker():
    global arr
    if request.method == "POST":
        print(request.form)
        print('here inside final game boggle post')
        if d.check(request.form["guess"]):
            result = check_string_valid_or_not(request.form['guess'])
            print('inside d', result)
        else:
            result = False
        return jsonify({"result": result})
    randomizer()
    return render_template('final.html', arr=arr)


def find_possible_steps(r,c, reserved_position, check_string):
    print(r, c, reserved_position)
    final_possible_steps = []
    all_possible_steps = [[r-1, c], [r-1, c+1], [r, c+1], [r+1, c+1], [r+1, c], [r+1, c-1], [r, c-1], [r-1, c-1]]
    for step in all_possible_steps:
        if step[0]<0 or step[0]>3 or step[1]<0 or step[1]>3 or step in reserved_position:
            continue
        else:
            if arr[step[0]][step[1]] != check_string[len(reserved_position)]:
                continue
            else:
                final_possible_steps.append(step)
    print(final_possible_steps, 'final possible steps')        
    return final_possible_steps



def check_string_valid_or_not(check_string):
    print(arr)
    starting_positions = []
    length = len(check_string)
    if length <3:
        return False
    # finding starting position
    for r in range(4):
        for c in range(4):
            if arr[r][c] == check_string[0]:
                starting_positions.append([r, c])
    if len(starting_positions) == 0:
        print('Not Valid String')

    else:
        print('else1')
        length -= 1
        for position in starting_positions:
            reserved_position = [] 
            reserved_position.append(position)
            print(check_string[0], ' is matched')
            next_possible_steps = find_possible_steps(position[0], position[1], reserved_position, check_string)
            if len(next_possible_steps) == 0:
                reserved_position.pop()
                if starting_positions.index(position) == len(starting_positions)-1:
                    print('not found')
                    return False
                continue

            else:
                print('else2')
                length -= 1
                print(check_string[1], ' is matched')
                for step in next_possible_steps:
                    reserved_position.append(step)
                    next_possible_steps_2 = find_possible_steps(step[0],step[1], reserved_position, check_string)
                    if len(next_possible_steps_2) == 0:
                        reserved_position.pop()
                        if next_possible_steps.index(step) == (len(next_possible_steps) - 1):
                            print(check_string[2], ' not matched')
                            return False
                        continue
                    else: 
                        print('else3')
                        print()
                        length -= 1
                        print(check_string[2] , ' is matched')
                        if length == 0:
                            print("valid string of 3 letters", next_possible_steps_2)
                            return True
                        for step2 in next_possible_steps_2:
                            reserved_position.append(step2)
                            print('here31')
                            next_possible_steps_3 = find_possible_steps(step2[0], step2[1], reserved_position, check_string)
                            print('here32')
                            if len(next_possible_steps_3) == 0 and next_possible_steps_2.index(step2) == (len(next_possible_steps_2) - 1):
                                print('NOt valid string')
                                return False
                            if len(next_possible_steps_3) == 0:
                                reserved_position.pop()
                                continue
                            else: 
                                length -= 1
                                print(check_string[3] , ' is matched')
                                if length == 0:
                                    print('Valid Stringgg of length 4', length)
                                    return True
                                print('length not zero')
                                for step3 in next_possible_steps_3:
                                    reserved_position.append(step3)
                                    print('here 41')
                                    next_possible_steps_4 = find_possible_steps(step3[0], step3[1], reserved_position, check_string)
                                    if len(next_possible_steps_4) == 0:
                                        reserved_position.pop()
                                        if next_possible_steps_3.index(step3) == (len(next_possible_steps_3) - 1):
                                            print(check_string[4], ' not matched')
                                            return False
                                        continue
                                    else:
                                        length -= 1
                                        print(check_string[4], ' is matched.', length)
                                        return True